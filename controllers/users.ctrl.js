const { ApiResponse } = require("../configuration/utils/ApiResponse.conf.js");

const { flag, statusCode, status } = require("../configuration/utils/Constant.conf.js");

const { masterData, select, getcount, deleteString, insert, update } = require("../models/users.model.js");

const fun_SelectById = async (req, res) => {
  try {
    const userId = req.body.userId || 0;
    let strQuery = select(` and userId = @userId `);

    const strSelectSQL = await req.sql.request();
    strSelectSQL.input("userId", userId);
    const result = await strSelectSQL.query(strQuery);

    if (result.recordset.length == 0) {
      return res.json(new ApiResponse(flag.fail, status.noData, statusCode.noData, []));
    } else {
      return res.json(new ApiResponse(flag.success, status.success, statusCode.success, result));
    }
  } catch (err) {
    return response.json(new ApiResponse(flag.fail, status.systemError, err, { originalUrl: req.originalUrl }));
  } finally {
    if (req.sql) {
      req.sql.close();
    }
  }
};

const fun_SelectAll = async (req, res) => {
  try {
    let strWhere = "";
    let strLimit = "";
    let strOrderBy = "";

    let pageIndex = req.body.pageIndex || "";
    let pageSize = req.body.pageSize || "";
    // Calculate offset based on page number and page size
    let offset = (pageIndex - 1) * pageSize;

    if (pageSize != "all") strLimit = ` OFFSET ${offset} ROWS FETCH NEXT ${pageSize} ROWS ONLY`;

    strOrderBy += ` order by userId desc `;

    let strQuery = select(strWhere + strOrderBy + strLimit);
    let strCount = getcount(strWhere);

    const strSelectAllSQL = req.sql.request();
    const resultQuery = await strSelectAllSQL.query(strQuery);
    const resultCount = await strSelectAllSQL.query(strCount);

    if (resultCount.recordset[0].cnt == 0) {
      return res.json(new ApiResponse(flag.fail, status.noData, statusCode.noData, []));
    } else {
      return res.json(
        new ApiResponse(flag.success, status.success, statusCode.success, {
          records: resultQuery.recordset,
          totalRecords: resultCount.recordset[0].cnt,
        })
      );
    }
  } catch (err) {
    return response.json(new ApiResponse(flag.fail, status.systemError, err, { originalUrl: req.originalUrl }));
  } finally {
    if (req.sql) {
      req.sql.close();
    }
  }
};

const fun_DeleteById = async (req, res) => {
  try {
    const userId = req.body.userId || 0;
    let strQuery = deleteString(` and userId = @userId `);

    const strDeleteSQL = await req.sql.request();
    strDeleteSQL.input("userId", userId);
    const result = await strDeleteSQL.query(strQuery);

    if (result.rowsAffected == 0) {
      return res.json(new ApiResponse(flag.fail, status.noData, statusCode.noData, []));
    } else {
      return res.json(new ApiResponse(flag.success, status.success, statusCode.delete, result));
    }
  } catch (err) {
    return response.json(new ApiResponse(flag.fail, status.systemError, err, { originalUrl: req.originalUrl }));
  } finally {
    if (req.sql) {
      req.sql.close();
    }
  }
};

const fun_Insert = async (req, res) => {
  try {
    const verb = masterData(req);
    const strQuery = insert(verb);

    const strCount = getcount(` and userId != 0 and emailId = @emailId `);

    const strSelectUserSQL = req.sql.request();
    strSelectUserSQL.input("emailId", verb.emailId);
    const resultCount = await strSelectUserSQL.query(strCount);

    if (resultCount.recordset[0].cnt != 0) {
      return res.json(new ApiResponse(flag.fail, status.existData, statusCode.existData, []));
    }

    const strInsertUserSQL = req.sql.request();
    strInsertUserSQL.input("firstName", strQuery.data.firstName);
    strInsertUserSQL.input("lastName", strQuery.data.lastName);
    strInsertUserSQL.input("mobile", strQuery.data.mobile);
    strInsertUserSQL.input("emailId", strQuery.data.emailId);
    strInsertUserSQL.input("passwordHash", strQuery.data.passwordHash);
    strInsertUserSQL.input("departmentId", strQuery.data.departmentId);
    strInsertUserSQL.input("designationId", strQuery.data.designationId);
    strInsertUserSQL.input("isActive", strQuery.data.isActive);
    strInsertUserSQL.input("profileImage", strQuery.data.profileImage);
    strInsertUserSQL.input("createdBy", strQuery.data.createdBy);
    strInsertUserSQL.input("createdOn", strQuery.data.createdOn);

    const resultQuery = await strInsertUserSQL.query(strQuery.query);
    return res.json(new ApiResponse(flag.success, status.success, statusCode.insert, resultQuery));
  } catch (err) {
    return response.json(new ApiResponse(flag.fail, status.systemError, err, { originalUrl: req.originalUrl }));
  } finally {
    if (req.sql) {
      req.sql.close();
    }
  }
};

const fun_Update = async (req, res) => {
  try {
    const verb = masterData(req);
    const strQuery = update(verb);

    const strCount = getcount(` and userId != @userId and emailId = @emailId `);

    const strSelectUserSQL = req.sql.request();
    strSelectUserSQL.input("userId", verb.userId);
    strSelectUserSQL.input("emailId", verb.emailId);
    const resultCount = await strSelectUserSQL.query(strCount);

    if (resultCount.recordset[0].cnt != 0) {
      return res.json(new ApiResponse(flag.fail, status.existData, statusCode.existData, []));
    }

    const strUpdateUserSQL = req.sql.request();
    strUpdateUserSQL.input("userId", strQuery.data.userId);
    strUpdateUserSQL.input("firstName", strQuery.data.firstName);
    strUpdateUserSQL.input("lastName", strQuery.data.lastName);
    strUpdateUserSQL.input("mobile", strQuery.data.mobile);
    strUpdateUserSQL.input("emailId", strQuery.data.emailId);
    strUpdateUserSQL.input("passwordHash", strQuery.data.passwordHash);
    strUpdateUserSQL.input("departmentId", strQuery.data.departmentId);
    strUpdateUserSQL.input("designationId", strQuery.data.designationId);
    strUpdateUserSQL.input("isActive", strQuery.data.isActive);
    strUpdateUserSQL.input("profileImage", strQuery.data.profileImage);
    strUpdateUserSQL.input("createdBy", strQuery.data.createdBy);
    strUpdateUserSQL.input("createdOn", strQuery.data.createdOn);

    const resultQuery = await strUpdateUserSQL.query(strQuery.query);
    if (resultQuery.rowsAffected == 0) {
      return res.json(new ApiResponse(flag.fail, status.noData, statusCode.noData, []));
    } else {
      return res.json(new ApiResponse(flag.success, status.success, statusCode.update, resultQuery));
    }
  } catch (err) {
    return response.json(new ApiResponse(flag.fail, status.systemError, err, { originalUrl: req.originalUrl }));
  } finally {
    if (req.sql) {
      req.sql.close();
    }
  }
};

module.exports = { fun_SelectById, fun_SelectAll, fun_DeleteById, fun_Insert, fun_Update };
