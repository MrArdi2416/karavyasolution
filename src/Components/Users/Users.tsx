import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { removeUserData } from "../../redux/formAction";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Table } from "@mui/material";

export const Users = () => {
  const userData = useSelector((state: RootState) => (state as any).userData);
  const dispatch = useDispatch();

  const handleDelete = (index: number) => {
    dispatch(removeUserData(index));
  };

  if (!userData || !userData.userRecords || userData.userRecords.length === 0) {
    return <div>No user data available.</div>;
  }

  return (
    <>

      <section className="items-center lg:flex bg-gray-50 lg:h-screen font-poppins dark:bg-gray-800 ">
        <div className="justify-center flex-1 max-w-8xl px-4 py-4 mx-auto lg:py-8 md:px-6">
          <div className="pt-4 rounded shadow bg-white dark:bg-gray-900">
            <div className="flex px-6 pb-4 border-b dark:border-gray-700">
              <h2 className="text-xl font-bold dark:text-gray-400">
                Register User
              </h2>
            </div>
            <div className="p-4 overflow-x-auto">
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="simple table">
                  <TableHead sx={{ backgroundColor: '#8696f785'}}>
                    <TableRow sx={{color:"white"}}>
                      <TableCell align="center">Firstname</TableCell>
                      <TableCell align="center">LastName</TableCell>
                      <TableCell align="center">Email</TableCell>
                      <TableCell align="center" style={{ minWidth: '120px'}}>Date of Birth</TableCell>
                      <TableCell align="center">Gender</TableCell>
                      <TableCell align="center">Address 1</TableCell>
                      <TableCell align="center">Address 2</TableCell>
                      <TableCell align="center">Country</TableCell>
                      <TableCell align="center">State</TableCell>
                      <TableCell align="center">Mobile Number</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userData.userRecords.map(
                      (userRecord: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell>
                            {userRecord.userDetails.firstname}
                          </TableCell>
                          <TableCell>
                            {userRecord.userDetails.lastname}
                          </TableCell>
                          <TableCell>{userRecord.userDetails.email}</TableCell>
                          <TableCell>{userRecord.userDetails.dob}</TableCell>
                          <TableCell>{userRecord.userDetails.gender}</TableCell>
                          <TableCell>
                            {userRecord.otherDetails.address1}
                          </TableCell>
                          <TableCell>
                            {userRecord.otherDetails.address2}
                          </TableCell>
                          <TableCell>
                            {userRecord.otherDetails.country}
                          </TableCell>
                          <TableCell>{userRecord.otherDetails.state}</TableCell>
                          <TableCell>
                            {userRecord.otherDetails.mobile}
                          </TableCell>
                          <TableCell>
                            {" "}
                            <IconButton aria-label="delete" size="large"   onClick={() => handleDelete(index)}>
                              <DeleteIcon fontSize="inherit" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
