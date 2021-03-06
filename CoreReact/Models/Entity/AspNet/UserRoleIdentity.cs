﻿using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreReact.Models.AspNetUsers
{
    public class UserRoleEntity : IdentityRole<string>
    {
        public UserRoleEntity()
            : base()
        {
        }

        public UserRoleEntity( string roleName )
            : base( roleName )
        {
        }
    }
}
