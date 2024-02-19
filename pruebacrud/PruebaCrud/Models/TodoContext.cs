using Microsoft.EntityFrameworkCore;
using PruebaCrud.Models;

namespace PruebaCrud.Models;

public class TodoContext : DbContext
{
    public TodoContext(DbContextOptions<TodoContext> options)
        : base(options)
    {
    }

    public DbSet<TodoItem> TodoItems { get; set; } = null!;

    public DbSet<Usuario> Usuarios { get; set; } = null!;
}