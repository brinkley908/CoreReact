using AutoMapper.Configuration;
using CoreReact.Models.AspNetUsers;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreReact
{
    public class SeedData 
    {

        //private readonly List<UserEntity> _users;

        //private readonly MemoryIdentities _context;

        //private readonly UserManager<UserEntity> _userManager;

        //private readonly RoleManager<UserRoleEntity> _userRoleManager;

        //private readonly SignInManager<UserEntity> _signInManager;

        //private readonly IOptions<IdentityOptions> _identityOptions;



        //public List<UserEntity> Users { get; set; }

        //public UserManager<UserEntity> UserManager { get { return _userManager; } }

        //public RoleManager<UserRoleEntity> UserRoleManager { get { return _userRoleManager; } }

        //public SignInManager<UserEntity> SignInManager { get { return _signInManager; } }

        //public IOptions<IdentityOptions> IdentityOptions { get { return _identityOptions; } }

        //IDateLogicService dateLogicService,
        //public SeedData
        //(
        //    IOptions<List<UserEntity>> users,
        //    MemoryIdentities context,
        //    UserManager<UserEntity> userManager,
        //    RoleManager<UserRoleEntity> roleManager,
        //    SignInManager<UserEntity> signInManager,
        //    IOptions<IdentityOptions> identityOptions
        //)
        //{
        //    _context = context;
        //    _users = users.Value;
        //    _userManager = userManager;
        //    _userRoleManager = roleManager;
        //    _signInManager = signInManager;
        //    _identityOptions = identityOptions;
        //}

        public static async Task InitializeAsync( IServiceProvider services, List<UserEntity> users)
        {

                    
            await AddTestUsers(
                services.GetRequiredService<RoleManager<UserRoleEntity>>(),
                services.GetRequiredService<UserManager<UserEntity>>(),
              users
                );
        }

        public static async Task AddTestUsers( RoleManager<UserRoleEntity> roleManager,  UserManager<UserEntity> userManager, List<UserEntity> users )
        {
            if ( roleManager.Roles.Any() || userManager.Users.Any() )
                return;


            await roleManager.CreateAsync( new UserRoleEntity( "Admin" ) { Id = Guid.NewGuid().ToString() } );


            foreach ( var user in users )
            {
                var newUser = new UserEntity
                {

                    Id = Guid.NewGuid().ToString(),
                    Email = user.Email,
                    UserName = user.UserName
                };

                await userManager.CreateAsync( newUser, "LetMeIn2020!!" );
                await userManager.AddToRoleAsync( newUser, "Admin" );
                await userManager.UpdateAsync( newUser );
            }



        }


    }


}
