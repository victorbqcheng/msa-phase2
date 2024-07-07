﻿namespace backend.Data;

using backend.Model;
using Microsoft.EntityFrameworkCore;

public class AppDbContext:DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Post> Posts { get; set; } = null!;
}
