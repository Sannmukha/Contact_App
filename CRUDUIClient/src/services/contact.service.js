import http from "../http-common";

class ContactDataService {
  
  getAll() {
    return http.get("/contacts/");
  }

  create(data) {
    return http.post("/contacts/create", data);
  }

  update(id, data) {
    return http.put(`/contacts/update/${id}`, data);
  }

  delete(id) {
    return http.get(`/contacts/delete/${id}`);
  }

  
}

export default new ContactDataService();