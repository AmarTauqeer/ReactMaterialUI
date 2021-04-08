import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  makeStyles,
  TablePagination,
  TableSortLabel,
} from "@material-ui/core";
import React, { useState } from "react";

// custom styles

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(3),
    "& thead th": {
      fontWeight: "600",
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.light,
    },
    "& tbody td": {
      fontWeight: "300",
    },
    "& tbody tr:hover": {
      backgroundColor: "#fffbf2",
      cursor: "pointer",
    },
  },
}));

export default function useTable(records, headCells,filterFn) {
  const classes = useStyles();

  const pages = [5, 10, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();

  const TblContainer = (props) => (
    <Table className={classes.table}>{props.children}</Table>
  );

  const TblHead = (props) => {
    const handleSortRequest = (id) => {
      const isAsc = orderBy === id && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(id);
    };
    return (
      <TableHead>
        <TableRow>
          {headCells.map((x) => (
            <TableCell key={x.id} 
            setDirection={orderBy===x.id ?order:false}>
              {headCells.disableSorting?headCells.label:
              <TableSortLabel
                active={orderBy === x.id}
                direction={orderBy === x.id ? order : "asc"}
                onClick={() => {
                  handleSortRequest(x.id);
                }}
              >
                {x.label}
              </TableSortLabel>
              }
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  //   // handle change rows per page

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // sort function

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  // comparator

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  // descending comparator

  function descendingComparator(a,b,orderBy){
    if (b[orderBy]<a[orderBy]) {
      return -1;
    }
    if (b[orderBy]>a[orderBy]) {
      return 1;
    }
    return 0;

  }
  // records after paging and sorting

  const recordsAfterPagingAndSorting = () => {
    return stableSort(filterFn.fn(records), getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      (page + 1) * rowsPerPage
    );
  };

  // pagination

  const TblPagination = () => (
    <TablePagination
      component="div"
      page={page}
      rowsPerPageOptions={pages}
      rowsPerPage={rowsPerPage}
      count={records.length}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );

  return {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  };
}
