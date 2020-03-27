using System;
using System.Collections.Generic;
using System.Linq;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static void SeedData(DataContext context)
        {
            if(!context.Activities.Any())
            {
                var activities = new List<Activity>()
                {
                   new Activity
                   {
                       Title = "Past Activity 1",
                       Date = DateTime.Now.AddMonths(-2),
                       Description = "Acivity 2 months ago",
                       Category = "drinks",
                       City = "London",
                       Venue = "pub"

                   } ,
                    new Activity
                   {
                       Title = "Past Activity 2",
                       Date = DateTime.Now.AddMonths(-1),
                       Description = "Acivity 1 months ago",
                       Category = "drinks",
                       City = "Lepoglava",
                       Venue = "pub"
                   } ,

                };
                context.Activities.AddRange(activities);
                context.SaveChanges();
            }
        }
    }
}