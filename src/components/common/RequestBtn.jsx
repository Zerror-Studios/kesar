import React from "react";
import RequestForm from "./RequestForm";
import Button from "./Button";
import { useModalStore } from "@/stores/modalStore";

const RequestBtn = () => {
  const { isRequestOpen, openRequest, closeRequest } = useModalStore();

  return (
    <>
      <Button title="Request Quotation" onClick={openRequest} color="blue" />
      <RequestForm open={isRequestOpen} setOpen={closeRequest} />
    </>
  );
};

export default RequestBtn;
