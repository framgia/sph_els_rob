import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { connect } from "react-redux";
import { isNull } from "lodash";

import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

import { listUser, changeRole } from "../actions";
import Header from "./Header";

const columns = [
  {
    id: "id",
    label: "ID",
    minWidth: "5%",
    align: "center",
  },
  {
    id: "Name",
    label: "Name",
    minWidth: "35%",
    align: "center",
  },
  {
    id: "email",
    label: "Email",
    minWidth: "45%",
    align: "center",
  },
  {
    id: "role",
    label: "Role",
    minWidth: "15%",
    align: "center",
    format: (value) => value.toFixed(2),
  },
];

const User = ({ listUser, users, changeRole }) => {
  const [cookies, setCookie] = useCookies(["user"]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  let navigate = useNavigate();

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

  useEffect(() => {
    if (cookies.token === undefined) {
      navigate("/");
    }
    listUser(cookies.token);
  }, []);

  return (
    <div>
      <Header title={cookies.user.role === "admin" ? "Admin" : ""} />
      <Container maxWidth="xl">
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <Typography variant="h4" color="inherit">
            Users
          </Typography>
        </Box>
      </Container>
      <Paper sx={{ width: "70%", overflow: "hidden", margin: "auto" }}>
        <TableContainer sx={{ maxHeight: 500, mt: "20px" }}>
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
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => {
                  if (!isNull(user))
                    if (user.id !== undefined)
                      return (
                        <TableRow
                          key={user.id}
                          hover
                          role="checkbox"
                          tabIndex={-1}
                        >
                          <StyledTableCell
                            component="th"
                            scope="row"
                            style={{ width: "5%" }}
                            align="left"
                          >
                            {user.id}
                          </StyledTableCell>
                          <StyledTableCell
                            style={{ width: "35%" }}
                            align="left"
                          >
                            {user.first_name} {user.last_name}
                          </StyledTableCell>
                          <StyledTableCell
                            style={{ width: "45%" }}
                            align="left"
                          >
                            {user.email}
                          </StyledTableCell>
                          <StyledTableCell
                            style={{ width: 150 }}
                            align="center"
                          >
                            <Link
                              component="button"
                              variant="caption"
                              underline="hover"
                              onClick={() => {
                                changeRole(user.id, cookies.token);
                                console.log(cookies.token);
                              }}
                              sx={{
                                fontSize: 14,
                                color: "#05386b",
                              }}
                            >
                              {user.role}
                            </Link>
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
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={<span>Rows:</span>}
          labelDisplayedRows={({ page }) => {
            return `Page: ${page + 1}`;
          }}
          backIconButtonProps={{
            color: "secondary",
          }}
          nextIconButtonProps={{ color: "secondary" }}
          SelectProps={{
            inputProps: {
              "aria-label": "page number",
            },
          }}
          showFirstButton={true}
          showLastButton={true}
          sx={{
            ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows":
              {
                margin: "auto",
              },
          }}
        />
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state.users);
  return {
    users: Object.values(state.users),
  };
};

export default connect(mapStateToProps, { listUser, changeRole })(User);
