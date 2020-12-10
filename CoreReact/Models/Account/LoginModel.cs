using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CoreReact.Models.Account
{
    public class LoginModel
    {
        [Required( ErrorMessage = "Required" )]
        [Display( Name = "Username" )]
        public string Username { get; set; }

        [Required( ErrorMessage = "Required" )]
        [DataType( DataType.Password )]
        [Display( Name = "Password" )]
        [RegularExpression( "([a-z]|[A-Z]|[0-9]|[\\W]){4}[a-zA-Z0-9\\W]{3,11}", ErrorMessage = "Min 7 characters, Numbers, Uppcase, LowerCase, Special !@#$%&/=?_.)" )]
        public string Password { get; set; }
    }
}
