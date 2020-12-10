using System;
using System.Linq;
using CoreReact.Models.AspNetUsers;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Threading.Tasks;
using CoreReact.Models.Account;
using CoreReact.Models;

namespace CoreReact.Service
{
    public interface ISignInService
    {

        ErrorAuthModel Error { get; }
        string DefaultError { get; }

        Task<bool> SignInAsync( LoginModel model );

        Task SignOutAsync();
    }
}
