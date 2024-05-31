import { DokuVariablesData } from "./dokuConfig";
import CryptoJS from "crypto-js";

export const generateSignature = (jsonBody: string) => {
  var digestSHA256 = CryptoJS.SHA256(CryptoJS.enc.Utf8.parse(jsonBody));
  var digestBase64 = CryptoJS.enc.Base64.stringify(digestSHA256);
  // console.log('Digest Component: ' + jsonBody)
  // console.log('Digest sha256: ' + digestSHA256)
  // console.log('Digest: ' + digestBase64)
  var signatureComponents =
    "Client-Id:" +
    DokuVariablesData.Client_Id +
    "\n" +
    "Request-Id:" +
    DokuVariablesData.Request_Id +
    "\n" +
    "Request-Timestamp:" +
    DokuVariablesData.Request_Timestamp +
    "\n" +
    "Request-Target:/checkout/v1/payment" +
    "\n" +
    "Digest:" +
    digestBase64;
  var signatureHmacSha256 = CryptoJS.HmacSHA256(
    signatureComponents,
    DokuVariablesData.SecretKey
  );
  var signatureBase64 = CryptoJS.enc.Base64.stringify(signatureHmacSha256);
  // console.log('Signature Components: ' + signatureComponents)
  // console.log('Signature HMACSHA256: ' + signatureHmacSha256)
  // console.log('Signature: ' + signatureBase64)
  return "HMACSHA256=" + signatureBase64;
};

export const generateSignatureCheck = (
  invoiceNumber: string
) => {
  // var invoiceNumber = 'INV-1717142454477'; // Replace this with the Invoice Number or Request-Id as the query params

  var signatureComponents =
    "Client-Id:" +
    DokuVariablesData.Client_Id +
    "\n" +
    "Request-Id:" +
    DokuVariablesData.Request_Id +
    "\n" +
    "Request-Timestamp:" +
    DokuVariablesData.Request_Timestamp +
    "\n" +
    "Request-Target:" +
    "/orders/v1/status/" +
    invoiceNumber;
  var signatureHmacSha256 = CryptoJS.HmacSHA256(
    signatureComponents,
    DokuVariablesData.SecretKey
  );
  var signatureBase64 = CryptoJS.enc.Base64.stringify(signatureHmacSha256);
  console.log("Signature Components: " + signatureComponents);
  console.log("Signature HMACSHA256: " + signatureHmacSha256);
  console.log("Signature: " + signatureBase64);
  return "HMACSHA256=" + signatureBase64;
};
