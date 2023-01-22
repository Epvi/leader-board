import React from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { useFormik } from "formik";
import * as yup from "yup";
import "../firebaseConfig";
import { auth } from "../firebaseConfig";
import { Button, Input } from '@chakra-ui/react'
import Link from "next/link";

const ForgotPassword = () => {
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const email = formik.values.email;

      sendPasswordResetEmail(auth, email)
        .then(() => {
          // Password reset email sent!
          alert("Email sent! Please check your spam folder");
          // ..
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
          // ..
        });
    },
  });
  return (
    <>
      <div
        style={{
          width: "50%",
          marginLeft: "37%",
        }}
      >
        <h3 style={{ marginTop: "15vh", marginBottom: "30px", color: "black" }}>
          Please Enter your email
        </h3>

        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={formik.handleSubmit}
        >
          <p style={{ fontSize: "14px" }}>Email</p>
          <Input
            style={{ width: "50%" }}
            fullWidth
            id="email"
            name="email"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            variant="outline"
            placeholder="Enter your email"
            marginBottom="20px"
          />
          <Button
            style={{ width: "50%", marginTop: "25px", borderRadius: "5px" }}
            colorScheme="green"
            variant="solid"
            fullWidth
            type="submit"
          >
            Send email
          </Button>
        </form>
        <p
          style={{
            fontSize: "14px",
            // marginLeft: "10%",
            color: "grey",
            marginTop: "30px",
          }}
        >
          Try logging in{" "}
          <Link href="/login">
            <span style={{ textDecoration: "none", color: "#3f51b5" }}>Login</span>
          </Link>
        </p>
      </div>
    </>
  );
};

export default ForgotPassword;
