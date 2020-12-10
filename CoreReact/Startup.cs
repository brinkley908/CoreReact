using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Net;

namespace CoreReact
{
    public class Startup
    {
        public Startup( IConfiguration configuration )
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices( IServiceCollection services )
        {

            services
                .AddDatabaseContexts( Configuration )
                .AddSecurity()
                .AddServices()
                .AddSessionStorage()
                .AddMapper();

            services.AddControllersWithViews();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles( configuration =>
             {
                 configuration.RootPath = "ClientApp/build";
             } );
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure( IApplicationBuilder app, IWebHostEnvironment env )
        {
            if ( env.IsDevelopment() )
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler( "/Error" );
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseAuthentication();
            app.UseStatusCodePages( async context =>
            {
                var response = context.HttpContext.Response;

                if ( response.StatusCode == (int)HttpStatusCode.Unauthorized ||
                    response.StatusCode == (int)HttpStatusCode.Forbidden ||
                    response.StatusCode == (int)HttpStatusCode.Forbidden )
                    response.Redirect( "/" );

                if ( response.StatusCode == (int)HttpStatusCode.Gone )
                    response.Redirect( "/logout" );

                response.Redirect( "/" );

            } );

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();
            app.UseAuthorization();

            app.UseEndpoints( endpoints =>
             {
                 endpoints.MapControllerRoute(
                     name: "default",
                     pattern: "{controller}/{action=Index}/{id?}" );
             } );

            app.UseSpa( spa =>
             {
                 spa.Options.SourcePath = "ClientApp";

                 if ( env.IsDevelopment() )
                 {
                     spa.UseReactDevelopmentServer( npmScript: "start" );
                 }
             } );
        }
    }
}
