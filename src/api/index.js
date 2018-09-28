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
