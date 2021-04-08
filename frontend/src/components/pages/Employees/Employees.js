import React, { useState } from "react";
import EmployeeForm from "./EmployeeForm";
import useTable from "../../useTable";
import PageHeader from "../../PageHeader";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";
import {
  InputAdornment,
  makeStyles,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
} from "@material-ui/core";
import * as employeeService from "./../../services/EmployeeService";
import Controls from "../../controls/Controls";
import { Search } from "@material-ui/icons";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import Popup from "../../Popup";
import Notification from "../../Notification";
import ConfirmDialog from "../../ConfirmDialog";

// custom styles

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "75%",
  },
  newButton: {
    position: "absolute",
    right: "10px",
  },
}));

export default function Employees() {
  const classes = useStyles();

  const [records, setRecords] = useState(employeeService.getAllEmployees());
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const headCells = [
    { id: "fullName", label: "Employee Name" },
    { id: "email", label: "Email" },
    { id: "mobile", label: "Mobile" },
    { id: "departmentId", label: "Department" },
    { id: "actions", label: "Actions", disableSorting: true },
  ];

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  } = useTable(records, headCells, filterFn);

  // change search
  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else
          return items.filter((x) =>
            x.fullName.toLowerCase().includes(target.value)
          );
      },
    });
  };

  // add or edit functionality

  const addOrEdit = (employee, resetForm) => {
    if (employee.id === 0) employeeService.insertEmployees(employee);
    else employeeService.updateEmployees(employee);
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    setRecords(employeeService.getAllEmployees());
    setNotify({
      isOpen: true,
      message: "Submit successfully.",
      type: "Success",
    });
  };

  const openInPop = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const onDelete = id => {
    setConfirmDialog({
        ...confirmDialog,
        isOpen: false
    })
    employeeService.deleteEmployee(id);
    setRecords(employeeService.getAllEmployees())
    setNotify({
        isOpen: true,
        message: 'Deleted Successfully',
        type: 'error'
    })
}

  return (
    <React.Fragment>
      <PageHeader
        title="New Employee"
        subTitle="form design with validation"
        icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Input
            label="Search Employees"
            className={classes.searchInput}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <Controls.Button
            text="Add New"
            varient="outlined"
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => {
              setOpenPopup(true);
              setRecordForEdit(null);
            }}
          />
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.fullName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.mobile}</TableCell>
                <TableCell>{item.department}</TableCell>
                <TableCell>
                  <Controls.ActionButton
                    color="primary"
                    onClick={() => {
                      openInPop(item);
                    }}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </Controls.ActionButton>
                  <Controls.ActionButton
                    color="secondary"
                    onClick={() => {
                      setConfirmDialog({
                        isOpen: true,
                        title: "Are you sure to delete this record?",
                        subTitle: "You ca't undo operation!",
                        onConfirm: () => {
                          onDelete(item.id);
                        },
                      });
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </Controls.ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
      <Popup title="Employee" openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <EmployeeForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </React.Fragment>
  );
}
