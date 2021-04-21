const configRepo = module.exports;

configRepo.SetConfig = (paypal) => {
  const config = {
    host: "api.sandbox.paypal.com",
    port: "",
    client_id:
      "AYWoGsnL-hOI6dDQYTz2cS3dvEWJT9yhvMBadZPH5KnmEf9Dm_JuBwHqPEim-6QQEwcEbc2xI3YrTOuR",
    client_secret:
      "EOBX0FQAXRttMDgILQcQSc0Y3NbJeVP9NfURYgU4StWTdR7-LUdPD1WBsHWt8AlXoV32V6v3B3WS--1w",
  };

  paypal.configure(config);
};