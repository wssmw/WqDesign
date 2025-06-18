import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
  CancelTokenSource,
} from 'axios';

// ******************** 类型定义 ********************
interface ApiResponse<T = any> {
  code: number;
  data: T;
  message: string;
  success: boolean;
}

interface RequestConfig extends AxiosRequestConfig {
  retry?: number; // 重试次数
  retryDelay?: number; // 重试延迟(ms)
  cache?: boolean; // 是否启用缓存
  cacheTTL?: number; // 缓存有效期(ms)
  cancelKey?: string; // 取消请求的标识key
}

interface PendingRequest {
  cancelKey: string;
  cancel: () => void;
}

// ******************** 核心封装 ********************
class Http {
  private instance: AxiosInstance;
  private pendingRequests: PendingRequest[] = [];
  private cacheMap = new Map<string, { data: any; expire: number }>();

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create({
      timeout: 10000,
      ...config,
    });

    // 请求拦截器
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => this.handleRequest(config),
      (error) => Promise.reject(error)
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse<ApiResponse>) => this.handleResponse(response),
      (error) => this.handleError(error)
    );
  }

  // ************** 公共方法 **************
  public request<T = any>(config: RequestConfig): Promise<T> {
    return this.instance.request(config);
  }

  public get<T = any>(url: string, config?: RequestConfig): Promise<T> {
    return this.request({ ...config, method: 'GET', url });
  }

  public post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request({ ...config, method: 'POST', url, data });
  }

  // 取消请求（支持单个或批量）
  public cancelRequest(cancelKey: string | string[]) {
    const keys = Array.isArray(cancelKey) ? cancelKey : [cancelKey];
    keys.forEach((key) => {
      const index = this.pendingRequests.findIndex((req) => req.cancelKey === key);
      if (index >= 0) {
        this.pendingRequests[index].cancel();
        this.pendingRequests.splice(index, 1);
      }
    });
  }

  // 清空缓存
  public clearCache() {
    this.cacheMap.clear();
  }

  // ************** 私有方法 **************
  private async handleRequest(config: InternalAxiosRequestConfig & RequestConfig) {
    // 1. 添加取消令牌
    if (config.cancelKey) {
      const source = axios.CancelToken.source();
      config.cancelToken = source.token;
      this.pendingRequests.push({
        cancelKey: config.cancelKey,
        cancel: () => source.cancel(`Request canceled: ${config.cancelKey}`),
      });
    }

    // 2. 处理缓存
    if (config.cache && config.method?.toUpperCase() === 'GET') {
      const cacheKey = this.generateCacheKey(config);
      const cachedData = this.cacheMap.get(cacheKey);
      if (cachedData && cachedData.expire > Date.now()) {
        return Promise.reject({ cached: true, data: cachedData.data });
      }
    }

    // 3. 统一添加 token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  }

  private handleResponse(response: AxiosResponse<ApiResponse>) {
    const { data, config } = response;
    const requestConfig = config as RequestConfig;

    // 1. 缓存响应数据
    if (requestConfig.cache && requestConfig.method?.toUpperCase() === 'GET') {
      const cacheKey = this.generateCacheKey(requestConfig);
      this.cacheMap.set(cacheKey, {
        data: data.data,
        expire: Date.now() + (requestConfig.cacheTTL || 60000),
      });
    }

    // 2. 清理 pending 队列
    if (requestConfig.cancelKey) {
      this.cancelRequest(requestConfig.cancelKey);
    }

    // 3. 返回业务数据
    return data.success ? data.data : Promise.reject(new Error(data.message));
  }

  private async handleError(error: any) {
    const config = error.config as RequestConfig;

    // 1. 处理缓存命中
    if (error.cached) {
      return Promise.resolve(error.data);
    }

    // 2. 自动重试逻辑
    if (config?.retry && !axios.isCancel(error)) {
      config.__retryCount = config.__retryCount || 0;
      if (config.__retryCount < config.retry) {
        config.__retryCount++;
        await new Promise((resolve) =>
          setTimeout(resolve, config.retryDelay || 1000)
        );
        return this.instance(config);
      }
    }

    // 3. 统一错误处理
    if (axios.isCancel(error)) {
      console.warn('Request canceled:', error.message);
    } else if (error.response) {
      switch (error.response.status) {
        case 401:
          console.error('未授权，跳转登录');
          break;
        case 404:
          console.error('资源不存在');
          break;
        case 500:
          console.error('服务器错误');
          break;
      }
    }

    return Promise.reject(error);
  }

  private generateCacheKey(config: AxiosRequestConfig) {
    return `${config.url}?${JSON.stringify(config.params)}`;
  }
}


export default Http;