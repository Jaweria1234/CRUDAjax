using CRUDAjax.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CRUDAjax.Controllers
{
    public class HomeController : Controller
    {
        EmployeeDB empDB = new EmployeeDB();
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }
        //public ActionResult AddNewEmployee(long empID, string empName)params
        //{
        //     //todo 

        //     return Json("", JsonRequestBehavior.AllowGet);
        //}
        public ActionResult List()
        {
            return Json(empDB.ListAll(), JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult Add(Employee emp)
        {
            //return Json(new { success = result > 0, affectedRows = result }, JsonRequestBehavior.AllowGet);
            return Json(empDB.Add(emp), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyID(int ID)
        {
            var Employee = empDB.ListAll().Find(x => x.EmployeeID.Equals(ID));
            return Json(Employee, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(Employee emp)
        {
            return Json(empDB.Update(emp), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int ID)
        {
            return Json(empDB.Delete(ID), JsonRequestBehavior.AllowGet);
        }
    }
}

