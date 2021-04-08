const keys = {
  employees: "employees",
  employeeId: "employeeId",
};
export const getDepartmentCollection = () => [
  { id: "1", title: "Development" },
  { id: "2", title: "Marketing" },
  { id: "3", title: "Accounting" },
  { id: "4", title: "HR" },
];

// generate unique id

export function generateEmployeeId() {
  if (localStorage.getItem(keys.employeeId) === null)
    localStorage.setItem(keys.employeeId, "0");
  var id = parseInt(localStorage.getItem(keys.employeeId));
  localStorage.setItem(keys.employeeId, (++id).toString());
  return id;
}

// insert
export function insertEmployees(data) {
  let employees = getAllEmployees();
  data["id"] = generateEmployeeId();
  employees.push(data);
  localStorage.setItem(keys.employees, JSON.stringify(employees));
}

//update
export function updateEmployees(data) {
  let employees = getAllEmployees();
  let recordIndex = employees.findIndex((x) => x.id === data.id);

  employees[recordIndex] = { ...data };
  localStorage.setItem(keys.employees, JSON.stringify(employees));
}

// delete
export function deleteEmployee(id) {
  let employees = getAllEmployees();
  employees = employees.filter((x) => x.id != id);
  localStorage.setItem(keys.employees, JSON.stringify(employees));
}

// get
export function getAllEmployees() {
  if (localStorage.getItem(keys.employees) === null)
    localStorage.setItem(keys.employees, JSON.stringify([]));
  let employees = JSON.parse(localStorage.getItem(keys.employees));

  // map department id to department title
  let departments = getDepartmentCollection();
  return employees.map((emp) => ({
    ...emp,
    department: departments[emp.departmentId - 1].title,
  }));
}
