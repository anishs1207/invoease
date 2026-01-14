import { describe, expect, it } from "vitest";
import axios from "axios";
import { Invoice } from "../../backend/src/models/invoice.model";
import { User } from "../../backend/src/models/user.model";

// for these test use of the supertets for it

// real e2e => for api testing
const BACKEND_INVOICE_URL = "http://localhost:3000/api/v1/invoice";

//@@ add verify JWT stuff so that it makes sure the cookies are present here

describe("Invoice Routes - /api/v1/invoice", () => {
  describe("/create-invoice - Used to Create an Invoice", () => {
    it("create-invoice-1: User Id is not passed", async () => {});

    it("create-invoice-2: All Required fields not passed", async () => {
      const dummyUser: any = await User.create({
        fullName: "Test User",
        email: "testuser@example.com",
        username: "testuser",
        password: "password123",
        role: "user",
        isVerified: true,
      });

      const token = dummyUser.generateAccessToken();

      console.log("token", token);

      const response = await axios.post(
        `${BACKEND_INVOICE_URL}/create-invoice`,
        {
          invoiceNumber: "INV-001",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      expect(response.status).toBe(200);
      expect(response.data).toEqual({
        message: "All Items Not Given",
      });
    });
    it("create-invoice-3: Validation of required fields failed", async () => {});
    it("create-invoice-4: Invoice with Invoice Number already exists for User", async () => {});
    it("create-invoice-5: Invoice Created Successfully", async () => {});
  });

  describe("/delete-invoice/:id - Delete Invoice", () => {
    it("delete-invoice-1: not id is passed ", () => {});

    it("delete-invoice-2: Invoice with given Id does not exist", () => {});

    it("delete-invoice-3: Invoice Deleted Successfully", () => {});
  });

  describe("/update-status/:id - Updated the Status of the Invoice", () => {
    it("update-status-1: Status Field is not passed", async () => {});
    it("update-status-2: Invoice with given Id not found", async () => {});
    it("update-status-3: Invoice Updated Successfully", async () => {});
  });

  describe("/invoices - Get User's Invoices", () => {
    it("invoices-1: UserId not found", async () => {});
    it("invoices-2: No Invoices Found", async () => {});
    it("invoices-3: All Invoices fetched Successfully for User", async () => {});
  });

  describe("/invoice/:id - Get particular Invoice By Id", () => {
    it("invoice/:id-1: Invoice with given Id not found", async () => {});
    it("invoice/:id-2: Invoice fetched successfully", async () => {});
  });
});
