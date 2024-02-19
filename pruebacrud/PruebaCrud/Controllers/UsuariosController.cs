using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using PruebaCrud.Models;

namespace PruebaCrud.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class UsuariosController : Controller
    {
        private readonly TodoContext _context;

        public UsuariosController(TodoContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Usuario>>> GetAllUsuario()
        {
            if (_context.Usuarios == null)
            {
                return NotFound();
            }

            return await _context.Usuarios.ToListAsync();
        }

        [HttpGet("{identificacion}")]

        public async Task<ActionResult<Usuario>> GetUsuario(string identificacion)
        {
            if (_context.Usuarios == null)
            {
                return NotFound();
            }
            var itemUsuario = await _context.Usuarios.FindAsync(identificacion);

            if (itemUsuario == null)
            {
                return NotFound();
            }

            return itemUsuario;

        }

        [HttpPut("{identificacion}")]
        public async Task<IActionResult> PutUsuario(string identificacion, Usuario usuario)
        {
            if (identificacion != usuario.identificacion)
            {
                return BadRequest();
            }

            _context.Entry(usuario).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return Ok(usuario);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsuarioExists(identificacion))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }


        [HttpPost]
        public async Task<ActionResult<Usuario>> CrearUsuario(Usuario usuario)
        {
            var usuarioExiste = _context.Usuarios.Where(a => a.identificacion == usuario.identificacion && a.tipoIdentificacion == usuario.tipoIdentificacion).FirstOrDefault();
            if (usuarioExiste != null)
            {
                return BadRequest("Usuario ya existente");
            }
            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();

            return Ok(usuario);
        }

        [HttpDelete("{identificacion}")]
        public async Task<IActionResult> DeleteUsuario(string identificacion)
        {
            if (_context.Usuarios == null)
            {
                return NotFound();
            }
            var itemUsuario = await _context.Usuarios.FindAsync(identificacion);
            if (itemUsuario == null)
            {
                return NotFound();
            }

            _context.Usuarios.Remove(itemUsuario);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        private bool UsuarioExists(string identificacion)
        {
            return (_context.Usuarios?.Any(e => e.identificacion == identificacion)).GetValueOrDefault();
        }


    }
}
