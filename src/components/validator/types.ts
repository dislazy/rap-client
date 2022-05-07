import { Property, Repository } from 'actions/types'
/**
 * 参数的通用字段抽离
 */
export interface CommonProps {
  itf: any // 接口级别，代号'I'
  mod: any // 模块级别，代号'M'
  repository: Repository // 项目级别，代号'P'
}

/**
 * 校验器的参数定义
 */
export interface ValidatorProps extends CommonProps {
  open: boolean
  onClose?: () => void
}

/**
 * 服务基本配置的参数定义
 */
export interface BaseServerSettingProps extends CommonProps {
  disabled?: boolean
}

/**
 * 服务基本配置数据定义
 */
export interface IBaseServerSettingData {
  domain?: string
  port?: number
  basePath?: string
  protocolType?: string
  useSSL?: boolean
  withCookie?: boolean
}

export interface TabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
}

export interface ResponseValidatorProps extends CommonProps {
  responseData?: any
}

export interface RequestParamsProps extends CommonProps {
  isLocked?: boolean
  onInvoke?: (requestBase: IRequestBaseData, params: IRequestParamsData, onSuccess?: () => void, onFail?: () => void) => void
}

export interface IRequestBaseData {
  method: string
  bodyOption: string
  path: string
  byProxy: boolean
}

export interface IRequestParamsData {
  headerParams: Property[]
  queryParams: Property[]
  bodyParams: Property[]
}

export interface InvokeParams {
  baseServer: IBaseServerSettingData
  globalHeaders?: { [key: string]: any }
  requestBase: IRequestBaseData
  headerParams?: { [key: string]: any }
  queryParams?: { [key: string]: any }
  bodyParams?: { [key: string]: any }
}

export interface ICheckSavedResult {
  isSaved: boolean
  message?: string
}
