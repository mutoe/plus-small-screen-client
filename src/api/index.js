import api from "./api";

/**
 * 上传文件
 * @author mutoe <mutoe@foxmail.com>
 * @export
 * @param {FormData} formData
 * @returns
 */
export function postFile(formData) {
  return api.post("/files", formData, { validateStatus: s => s === 201 });
}

/**
 * 创建上传任务（新接口）
 * @author mutoe <mutoe@foxmail.com>
 * @export
 * @param {Object} payload
 * @returns
 */
export function createStorage(payload) {
  return api.post("/storage", payload, { validateStatus: s => s === 201 });
}
