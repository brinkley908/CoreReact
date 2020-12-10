using AutoMapper;
using CoreReact.Infrastructure;
using CoreReact.Models.AspNetUsers;
using CoreReact.Service;

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {


        public static IServiceCollection AddDatabaseContexts( this IServiceCollection services, IConfiguration configuration )
         => services
                    .Configure<List<UserEntity>>( configuration.GetSection( "AspNetUser" ) )
                    .AddDbContext<MemoryIdentities>( options =>
                    {
                        options.UseInMemoryDatabase( "aspnet" );
                    } );


        public static IServiceCollection AddSecurity( this IServiceCollection services )
        {
            services.AddAuthentication();
            services.AddIdentity<UserEntity, UserRoleEntity>()
            .AddEntityFrameworkStores<MemoryIdentities>()
            .AddSignInManager<SignInManager<UserEntity>>();

            return services;
        }


        public static IServiceCollection AddSessionStorage( this IServiceCollection services )
        => services.AddDistributedMemoryCache()
                   .AddSession( options =>
                   {
                       //options.IdleTimeout = TimeSpan.FromSeconds( 10 );
                       //options.Cookie.HttpOnly = true;
                       options.Cookie.IsEssential = true;
                   } );




        public static IServiceCollection AddMapper( this IServiceCollection services )
        => services
                    .AddAutoMapper( options =>
                    {
                        options.AddProfile<MappingProfile>();
                    } );

        public static IServiceCollection AddServices( this IServiceCollection services )
        => services
                   .AddScoped<ISignInService, SignInService>();


    }
}
