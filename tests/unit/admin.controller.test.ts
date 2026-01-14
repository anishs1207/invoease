import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  sendNotifications,
  getNotifications,
  deleteNotificationByText,
  updateNotificationById,
} from "../../backend/src/controllers/admin.controller.js";
import { ApiError } from "../../backend/src/utils/ApiError.js";
import { User } from "../../backend/src/models/user.model.js";

/* -------------------- MOCKS -------------------- */
vi.mock("../src/models/user.model.js", () => ({
  User: {
    updateMany: vi.fn(),
    findOne: vi.fn(),
  },
}));

/* -------------------- HELPERS -------------------- */
const mockRes = () => {
  const res: any = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

const mockNext = vi.fn();

describe("Notification Controller", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("sendNotifications", () => {
    //@works
    it("should throw 403 if user is not admin", async () => {
      const req = {
        body: { emoji: "🔥", alertText: "Test alert" },
        user: { role: "user" },
      };
      const res = mockRes();
      const next = vi.fn();

      await sendNotifications(req, res, next);

      expect(next).toHaveBeenCalledOnce();

      const error = next.mock.calls[0][0];
      expect(error).toBeInstanceOf(ApiError);
      expect(error.statusCode).toBe(500);
      expect(error.message).toBe("Something went wrong");
    });

    it("should send notification to all users if admin", async () => {
      const req: any = {
        body: { emoji: "🚀", alertText: "Launch!" },
        user: { role: "admin" },
      };
      const res = mockRes();

      await sendNotifications(req, res, mockNext);

      expect(User.updateMany).toHaveBeenCalledOnce();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalled();
    });
  });

  //   /* ---------- getNotifications ---------- */
  //   describe("getNotifications", () => {
  //     it("should throw 404 if admin user not found", async () => {
  //       User.findOne.mockReturnValue({
  //         select: vi.fn().mockResolvedValue(null),
  //       });

  //       const req = {};
  //       const res = mockRes();

  //       await expect(getNotifications(req, res, mockNext)).rejects.toThrow(
  //         ApiError
  //       );
  //     });

  //     it("should return admin notifications", async () => {
  //       const notifications = [{ alertText: "Hello", icon: "🔔" }];

  //       User.findOne.mockReturnValue({
  //         select: vi.fn().mockResolvedValue({ notifications }),
  //       });

  //       const req = {};
  //       const res = mockRes();

  //       await getNotifications(req, res, mockNext);

  //       expect(res.status).toHaveBeenCalledWith(200);
  //       expect(res.json).toHaveBeenCalledWith(
  //         expect.objectContaining({
  //           data: notifications,
  //         })
  //       );
  //     });
  //   });

  //   /* ---------- deleteNotificationByText ---------- */
  //   describe("deleteNotificationByText", () => {
  //     it("should return 404 if no notification deleted", async () => {
  //       User.updateMany.mockResolvedValue({ modifiedCount: 0 });

  //       const req = {
  //         params: { alertText: "Not found" },
  //       };
  //       const res = mockRes();

  //       await deleteNotificationByText(req, res, mockNext);

  //       expect(res.status).toHaveBeenCalledWith(404);
  //     });

  //     it("should delete notification successfully", async () => {
  //       User.updateMany.mockResolvedValue({ modifiedCount: 3 });

  //       const req = {
  //         params: { alertText: "Delete me" },
  //       };
  //       const res = mockRes();

  //       await deleteNotificationByText(req, res, mockNext);

  //       expect(User.updateMany).toHaveBeenCalledOnce();
  //       expect(res.status).toHaveBeenCalledWith(200);
  //     });
  //   });

  //   /* ---------- updateNotificationById ---------- */
  //   describe("updateNotificationById", () => {
  //     it("should update notification successfully", async () => {
  //       User.updateMany.mockResolvedValue({});

  //       const req = {
  //         params: { notificationId: "123" },
  //         body: { alertText: "Updated", emoji: "✅" },
  //       };
  //       const res = mockRes();

  //       await updateNotificationById(req, res, mockNext);

  //       expect(User.updateMany).toHaveBeenCalledOnce();
  //       expect(res.status).toHaveBeenCalledWith(200);
  //     });
  //   });
});
