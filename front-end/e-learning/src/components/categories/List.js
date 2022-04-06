import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Tooltip from "@mui/material/Tooltip";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import DoubleArrowRoundedIcon from "@mui/icons-material/DoubleArrowRounded";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

import { listCategory } from "../../actions";
import Update from "./Update";
import Delete from "./Delete";
import { isNull, set } from "lodash";
import Create from "./Create";
import { width } from "@mui/system";

const List = ({ listCategory, categories, token, user }) => {
  const [cookies, setCookie] = useCookies(["user"]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [edit, setEdit] = useState(null);
  const [del, setDelete] = useState(null);
  const [openNotification, setOpenNotification] = useState(false);
  const [message, setMessage] = useState("");
  const [category_id, setCategoryID] = useState(0);
  const [show_more, setShowMore] = useState(false);
  const [search_term, setSearchTerm] = useState("");

  let navigate = useNavigate();

  const navigateTo = (category) => {
    setCookie("category", category, { path: "/" });
    navigate(`/word_choices/${category.id}`);
  };

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
      align: "center",
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

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleNotificationClose = () => {
    setOpenNotification(false);
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

  const StyledEditIcon = styled(ModeEditIcon)(({ theme }) => ({
    color: "#464E2E",
  }));

  const StyledDeleteIcon = styled(DeleteRoundedIcon)(({ theme }) => ({
    color: "#BB6464",
  }));

  const StyledViewIcon = styled(DoubleArrowRoundedIcon)(({ theme }) => ({
    color: "#05386b",
  }));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    listCategory(token);
  }, [page]);

  return (
    <div>
      <Container maxWidth="xl" sx={{ margin: "auto", mb: 2 }}>
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Grid container spacing={2}>
            <Grid
              item
              xs={3}
              sx={{ display: "flex", justifyContent: "flex-start" }}
            >
              <Typography variant="h4" color="inherit">
                Categories
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Paper
                component="form"
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: 400,
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search category"
                  value={search_term}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <IconButton
                  type="submit"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              {cookies.role === "admin" ? (
                <Create token={cookies.token} user={cookies.user} />
              ) : (
                ""
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Paper sx={{ width: "96%", overflow: "hidden", margin: "auto" }}>
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
              {categories.length > 0 ? (
                categories
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .reverse()
                  .filter((category) => {
                    if (!search_term) {
                      return category;
                    } else if (
                      category.title
                        .toLowerCase()
                        .includes(search_term.toLowerCase())
                    ) {
                      return category;
                    }
                  })
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
                              align="left"
                            >
                              {category.id}
                            </StyledTableCell>
                            <StyledTableCell
                              style={{ width: "25%" }}
                              align="left"
                            >
                              {category.title}
                            </StyledTableCell>
                            <StyledTableCell
                              style={{ width: "55%" }}
                              align="left"
                            >
                              {category.description.length <= 300 ? (
                                <Typography
                                  paragraph={false}
                                  align="justify"
                                  style={{
                                    display: "inline-block",
                                    whiteSpace: "pre-line",
                                  }}
                                >
                                  {category.description}
                                </Typography>
                              ) : (
                                <div>
                                  {category_id === category.id && show_more ? (
                                    <Typography
                                      paragraph={false}
                                      align="justify"
                                      style={{
                                        display: "inline-block",
                                        whiteSpace: "pre-line",
                                      }}
                                    >
                                      {category.description}{" "}
                                      <Button
                                        onClick={() => {
                                          setCategoryID(0);
                                          setShowMore(false);
                                        }}
                                        sx={{
                                          textTransform: "lowercase",
                                          "&:hover": {
                                            color: "#BB6464",
                                            backgroundColor: "transparent",
                                          },
                                        }}
                                      >
                                        show less
                                      </Button>
                                    </Typography>
                                  ) : (
                                    <Typography
                                      paragraph={false}
                                      align="justify"
                                    >
                                      {category.description.substring(0, 300)}
                                      ...
                                      <Button
                                        onClick={() => {
                                          setCategoryID(category.id);
                                          setShowMore(true);
                                        }}
                                        sx={{
                                          textTransform: "lowercase",
                                          "&:hover": {
                                            color: "#BB6464",
                                            backgroundColor: "transparent",
                                          },
                                        }}
                                      >
                                        show more
                                      </Button>
                                    </Typography>
                                  )}
                                </div>
                              )}
                            </StyledTableCell>
                            <StyledTableCell
                              style={{ width: 150 }}
                              align="center"
                            >
                              <Tooltip title="Update" placement="top">
                                <IconButton
                                  onClick={() => setEdit(category.id)}
                                >
                                  <StyledEditIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Remove" placement="top">
                                <IconButton
                                  onClick={() => setDelete(category.id)}
                                >
                                  <StyledDeleteIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="View" placement="top">
                                <IconButton
                                  onClick={() => navigateTo(category)}
                                >
                                  <StyledViewIcon />
                                </IconButton>
                              </Tooltip>
                              {category.id === edit ? (
                                <Update
                                  data={category}
                                  onSetState={setEdit}
                                  onSetOpenNotification={setOpenNotification}
                                  onSetMessage={setMessage}
                                  isOpen={true}
                                  token={token}
                                  user={user}
                                />
                              ) : (
                                ""
                              )}
                              {category.id === del ? (
                                <Delete
                                  data={category}
                                  onSetState={setDelete}
                                  onSetOpenNotification={setOpenNotification}
                                  onSetMessage={setMessage}
                                  isOpen={true}
                                  token={token}
                                  user={user}
                                />
                              ) : (
                                ""
                              )}
                            </StyledTableCell>
                          </TableRow>
                        );
                  })
              ) : (
                <Box width="100%">
                  <Typography
                    textAlign="center"
                    sx={{
                      color: "red",
                      fontWeight: "bold",
                      fontSize: 15,
                    }}
                  >
                    No category
                  </Typography>
                </Box>
              )}
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
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={openNotification}
        onClose={handleNotificationClose}
        autoHideDuration={3000}
      >
        <Alert
          onClose={handleNotificationClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

const mapStateToProps = (state) => ({
  categories: Object.values(state.categories),
});

export default connect(mapStateToProps, { listCategory })(List);
