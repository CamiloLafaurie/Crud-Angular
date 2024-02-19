using System;
using System.ComponentModel.DataAnnotations;

namespace PruebaCrud.Models
{
    public class Usuario

    {
        [Key]
        public string identificacion { get; set; }

        public string tipoIdentificacion { get; set; }
        public string nombre { get; set; }
        public string apellido { get; set; }
        public string correo { get; set; }
        public int edad { get; set; }
        public DateTime fechaNacimiento { get; set; }
    }
}
