using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoreReact.Models.Account;
using CoreReact.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CoreReact.Controllers
{
    [ApiController]
    [Route( "[controller]" )]
    public class AccountController : ControllerBase
    {
        private readonly ISignInService _signInService;

        public AccountController( ISignInService signInService )
        {
            _signInService = signInService;
        }

        [AllowAnonymous]
        [HttpGet( Name = nameof( IsAuthenticated ) )]
        [Route( "IsAuthenticated" )]
        public bool IsAuthenticated() => User.Identity.IsAuthenticated;

        [AllowAnonymous]
        [HttpPost( Name = nameof( Login ) )]
        [Route( "Login" )]
        public async Task<JsonResult> Login( [FromBody] LoginModel model )
        {

            bool success = false;
             
            if ( ModelState.IsValid )
            {
                success = await _signInService.SignInAsync( model );
            }

            return new JsonResult( new
            {
                Success = success,
                Userame = model.Username,
                Error = success ? null : _signInService.Error?.Message ?? _signInService.DefaultError
            } );
            ;

        }

    }
}
