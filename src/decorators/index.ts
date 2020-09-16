/*
 * @Description: 自定义装饰器
 * @Autor: 胡椒
 * @Date: 2020-08-21 12:47:10
 * @LastEditors: 胡椒
 * @LastEditTime: 2020-09-03 11:08:20
 */
import 'reflect-metadata'; // WeakMap<any, Map<any, Map<any, any>>>  -> weakMap.get(o).get(p).get(k)
import { debounce as debounceFn, throttle as throttleFn } from 'lodash';

/** 防抖处理-wait指定调用被推迟的时间(默认3s) */
export const debounce = (wait = 3000): MethodDecorator => {
  return (target, propertyKey, descriptor: PropertyDescriptor) => {
    descriptor.value = debounceFn(descriptor.value, wait || 3000, {
      trailing: false,
    });
  };
};

/** 节流处理-wait指定触发间隔(默认3s) */
export const throttle = function(wait = 2000): MethodDecorator {
  return function(target, propertyKey, descriptor: PropertyDescriptor) {
    const fn = descriptor.value;
    descriptor.value = throttleFn(fn, wait, { trailing: false });
  };
};

/** 捕获异常处理-将传入的函数用try catch块包裹 */
export const catchError: MethodDecorator = function(
  target,
  propertyKey,
  descriptor: PropertyDescriptor,
) {
  const fn = descriptor.value;
  descriptor.value = function(...args: any[]) {
    try {
      fn.apply(this, args);
    } catch (ex) {
      console.log(ex);
    }
  };
};

const requiredMetadataKey = Symbol('required');

/** 用于函数参数前表示该参数为必填 eg：(@required _id: string), 需配合方法装饰器(validate)使用 */
export const required: ParameterDecorator = function(
  target: object,
  propertyKey: string | symbol,
  parameterIndex: number,
) {
  const existingRequiredParameters: number[] =
    Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
  existingRequiredParameters.push(parameterIndex);
  Reflect.defineMetadata(requiredMetadataKey, existingRequiredParameters, target, propertyKey);
};

/** 配合参数装饰器(required)对参数进行必填验证 */
export const validate: MethodDecorator = function(
  target,
  propertyKey,
  descriptor: PropertyDescriptor,
) {
  const method = descriptor.value;
  descriptor.value = function(...args: any[]) {
    const requiredParameters: number[] = Reflect.getOwnMetadata(
      requiredMetadataKey,
      target,
      propertyKey,
    );
    if (requiredParameters) {
      for (const parameterIndex of requiredParameters) {
        if (parameterIndex >= args.length || args[parameterIndex] === undefined) {
          throw new Error('Missing required argument.');
        }
      }
    }
    return method.apply(this, args);
  };
};
