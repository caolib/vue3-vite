import request from "@/util/request";

const getAllBookService = function () {
  return request.get("/book");
};

export { getAllBookService };
