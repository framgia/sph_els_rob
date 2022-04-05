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
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";

import { listUser, changeRole } from "../actions";
import Header from "./Header";
import ChangeRole from "./ChangeRole";

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
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [openChangeRole, setOpenChangeRole] = useState(false);
  const [changeID, setChangeID] = useState(0);
  const [userName, setUserName] = useState("");
  const [search_term, setSearchTerm] = useState("");

  let navigate = useNavigate();

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleNotificationClose = () => {
    setOpen(false);
  };

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
      <Header
        title={cookies.user.role === "admin" ? "Admin" : ""}
        active="users"
      />
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 500,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search user"
              value={search_term}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>

        <TableContainer sx={{ maxHeight: 500, mt: 1 }}>
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
                .filter((user) => {
                  var text = `${user.first_name} ${user.last_name} ${user.email}`;
                  if (!search_term) {
                    return user;
                  } else if (
                    text.toLowerCase().includes(search_term.toLowerCase())
                  ) {
                    return user;
                  }
                })
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
                                setChangeID(user.id);
                                setOpenChangeRole(true);
                                setUserName(user.first_name);
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
      {openChangeRole ? (
        <ChangeRole
          user_id={changeID}
          token={cookies.token}
          isOpen={true}
          onSetOpenNotification={setOpen}
          onSetMessage={setMessage}
          onSetChangeID={setChangeID}
          onSetOpenChangeRole={setOpenChangeRole}
          user_name={userName}
        />
      ) : (
        ""
      )}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={open}
        onClose={handleNotificationClose}
        autoHideDuration={3000}
      >
        <Alert
          onClose={handleNotificationClose}
          severity="success"
          sx={{ width: "100%", bgcolor: "#464E2E" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: Object.values(state.users),
  };
};

export default connect(mapStateToProps, { listUser, changeRole })(User);
