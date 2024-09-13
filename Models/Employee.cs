using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CRUDAjax.Models
{
    public class Employee
    {
        public int EmployeeID { get; set; } // Property for the unique identifier of the employee

        public string Name { get; set; } // Property for the name of the employee

        public int Age { get; set; } // Property for the age of the employee

        public string State { get; set; } // Property for the state where the employee resides

        public string Country { get; set; } // Property for the country where the employee resides
    }
}