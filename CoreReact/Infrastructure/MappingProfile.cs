using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using AutoMapper;


namespace CoreReact.Infrastructure
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            //CreateMap<BlogPost, BlogPostModel>()
            //    .ForMember( d => d.BlogComments, o => o.MapFrom( src => src.BlogComments.ToList() ) );

            //CreateMap<BlogPost, BlogTitleModel>()
            //    .ForMember( d => d.CommentCount, o => o.MapFrom( src => src.BlogComments.Count ) );

        }
    }
}
