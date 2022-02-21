import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";

import { listCategory } from "../../actions";
import { isNull } from "lodash";

const List = ({ listCategory, categories, token, user }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const columns = [
    {
      id: "id",
      label: "ID",
      minWidth: "5%",
      align: "center",
    },
    {
      id: "title",
      label: "Title",
      minWidth: "25%",
      align: "left",
    },
    {
      id: "description",
      label: "Description",
      minWidth: "55%",
      align: "center",
    },
    {
      id: "actions",
      label: "Actions",
      minWidth: "15%",
      align: "center",
      format: (value) => value.toFixed(2),
    },
  ];

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      background: "#BB6464",
      color: theme.palette.common.white,
      fontSize: 14,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const printCategory = (values) => {
    console.log(values);
  };

  useEffect(() => {
    console.log(categories);
    listCategory(token);
  }, [page]);

  return (
    <Paper sx={{ width: "95%", overflow: "hidden", margin: "auto" }}>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {categories
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((category) => {
                if (!isNull(category))
                  if (category.id !== undefined)
                    return (
                      <TableRow
                        key={category.id}
                        hover
                        role="checkbox"
                        tabIndex={-1}
                      >
                        <StyledTableCell
                          component="th"
                          scope="row"
                          style={{ width: "5%" }}
                          align="center"
                        >
                          {category.id}
                        </StyledTableCell>
                        <StyledTableCell style={{ width: "25%" }} align="left">
                          {category.title}
                        </StyledTableCell>
                        <StyledTableCell
                          style={{ width: "55%" }}
                          align="center"
                        >
                          {category.description}
                        </StyledTableCell>
                      </TableRow>
                    );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={categories.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

const mapStateToProps = (state) => {
  console.log(state.categories);
  return {
    categories: Object.values(state.categories),
  };
};

export default connect(mapStateToProps, { listCategory })(List);
