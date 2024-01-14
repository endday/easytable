import { PREFIX_CLS } from './constant'

/*
 * @clsName
 * @desc  get class name
 * @param {string} cls - class
 */
export function clsName(cls: string) {
  return PREFIX_CLS + cls
}
