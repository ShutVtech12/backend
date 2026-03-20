const bcryptjs = require('bcryptjs')

const resolvers = {
    //Todas las funciones para la lectura de los datos.
    Query: {
        obtenerAutores: async (_, { }, { prisma }) => {
            try {
                const autores = await prisma.autor.findMany()
                return autores
            } catch (error) {
                console.error("Error en obtenerAutores: ", error)
                throw new Error("No se pudieron cargar los autores")
            }
        },
        obtenerRoles: async (_, { }, { prisma }) => {
            try {
                const roles = await prisma.rol.findMany()
                return roles
            } catch (error) {
                console.error("Error en obtenerRoles: ", error)
                throw new Error("No se pudieron cargar los roles")
            }
        },
        obtenerUsuarios: async (_, { }, { prisma }) => {
            try {
                const usuarios = await prisma.usuario.findMany()
                return usuarios
            } catch (error) {
                console.error("Error en obtenerUsuarios: ", error)
                throw new Error("No se pudieron cargar los usuarios")
            }
        },
        obtenerLibros: async (_, { }, { prisma }) => {
            try {
                const libros = await prisma.libro.findMany({ include: { autor: true } })
                return libros
            } catch (error) {
                console.error("Error en obtenerLibros: ", error)
                throw new Error("No se pudieron cargar los libros")
            }
        },
        obtenerColecciones: async (_, { }, { prisma }) => {
            try {
                const colecciones = await prisma.coleccion.findMany({
                    include: { usuario: true, libro: { include: { autor: true } } }
                })
                return colecciones
            } catch (error) {
                console.error("Error en obtenerColecciones: ", error)
                throw new Error("No se pudieron cargar las colecciones")
            }
        },
        obtenerAutor: async (_, { id }, { prisma }) => {
            try {
                const autor = await prisma.autor.findUnique({
                    where: { id_autor: Number(id) }
                })
                if (!autor) {
                    throw new Error("Autor no encontrado");
                }
                return autor
            } catch (error) {
                console.error("Error en obtenerAutor: ", error)
                throw new Error("No se pudo cargar la información del autor")
            }
        },
        obtenerRol: async (_, { id }, { prisma }) => {
            try {
                const rol = await prisma.rol.findUnique({
                    where: { id_rol: Number(id) }
                })
                if (!rol) {
                    throw new Error("Rol no encontrado");
                }
                return rol
            } catch (error) {
                console.error("Error en obtenerRol: ", error)
                throw new Error("No se pudo cargar la información del rol")
            }
        },
        obtenerUsuario: async (_, { id }, { prisma }) => {
            try {
                const usuario = await prisma.usuario.findUnique({
                    where: { id_usuario: Number(id) }
                })
                if (!usuario) {
                    throw new Error("Usuario no encontrado");
                }
                return usuario
            } catch (error) {
                console.error("Error en obtenerUsuario: ", error)
                throw new Error("No se pudo cargar la información del usuario")
            }
        },
        obtenerLibro: async (_, { id }, { prisma }) => {
            try {
                const libro = await prisma.libro.findUnique({
                    where: { id_libro: Number(id) }
                })
                if (!libro) {
                    throw new Error("Libro no encontrado");
                }
                return libro
            } catch (error) {
                console.error("Error en obtenerLibro: ", error)
                throw new Error("No se pudo cargar la información del libro")
            }
        },
        obtenerColeccion: async (_, { id }, { prisma }) => {
            try {
                const coleccion = await prisma.coleccion.findUnique({
                    where: { id_coleccion: Number(id) }
                })
                if (!coleccion) {
                    throw new Error("Colección no encontrada");
                }
                return coleccion
            } catch (error) {
                console.error("Error en obtenerColeccion: ", error)
                throw new Error("No se pudo cargar la información de la colección")
            }
        },
        obtenerUsuariosPorRol: async (_, { id }, { prisma }) => {
            try {
                const usuarios = await prisma.usuario.findMany({
                    where: {
                        id_rol: Number(id)
                    },
                    include: {
                        rol: true
                    }
                })
                if (usuarios.length === 0) {
                    throw new Error("No hay usuarios registrados con el rol");
                }
                return usuarios
            } catch (error) {
                console.error("Error en obtenerUsuariosPorRol: ", error)
                throw new Error("No se pudo cargar la información de los usuarios por rol")
            }
        },
        obtenerLibrosPorAutor: async (_, { id }, { prisma }) => {
            try {
                const libros = await prisma.libro.findMany({
                    where: {
                        id_autor: Number(id)
                    },
                    include: {
                        autor: true
                    }
                })
                if (libros.length === 0) {
                    throw new Error("No hay libros registrados para ese autor");
                }
                return libros
            } catch (error) {
                console.error("Error en obtenerLibrosPorAutor: ", error)
                throw new Error("No se pudo cargar la información de los libros por autor")
            }
        },
        obtenerColeccionesPorUsuario: async (_, { id }, { prisma }) => {
            try {
                const colecciones = await prisma.coleccion.findMany({
                    where: {
                        id_usuario: Number(id)
                    },
                    include: {
                        usuario: true
                    }
                })
                if (colecciones.length === 0) {
                    throw new Error("Todavía no tienes ninguna colección");
                }
                return colecciones
            } catch (error) {
                console.error("Error en obtenerColeccionesPorUsuario: ", error)
                throw new Error("No se pudo cargar la información de tus colecciones")
            }
        },
        obtenerColeccionesPorLibro: async (_, { id }, { prisma }) => {
            try {
                const colecciones = await prisma.coleccion.findMany({
                    where: {
                        id_libro: Number(id)
                    },
                    include: {
                        libro: true
                    }
                })
                if (colecciones.length === 0) {
                    throw new Error("Ese libro no tiene una colección");
                }
                return colecciones
            } catch (error) {
                console.error("Error en obtenerColeccionesPorLibro: ", error)
                throw new Error("No se pudo cargar la información de la colección")
            }
        }
    },

    Mutation: {
        crearRol: async (parent, { input }, { prisma }) => {
            const existe = await prisma.rol.findUnique({ where: { nombre_rol: input.nombre_rol } })
            if (existe) throw new Error("El rol ya existe")
            try {
                const nuevoRol = await prisma.rol.create({
                    data: {
                        nombre_rol: input.nombre_rol
                    }
                })
                return nuevoRol
            } catch (error) {
                throw new Error("No se pudo crear el rol: " + error.message)
            }
        },
        actualizarRol: async (parent, { id, input }, { prisma }) => {
            try {
                const actualizarRol = await prisma.rol.update({
                    where: { id_rol: Number(id) },
                    data: {
                        nombre_rol: input.nombre_rol
                    }
                })
                return actualizarRol
            } catch (error) {
                throw new Error("No se puede actualizar el rol: " + error.message)
            }
        },
        eliminarRol: async (parent, { id }, { prisma }) => {
            try {
                const eliminarRol = await prisma.rol.delete({
                    where: { id_rol: Number(id) },
                })
                return "Rol eliminado"
            } catch (error) {
                if (error.code === 'P2003') {
                    throw new Error("No puedes eliminar este rol porque hay usuarios asociados a él. Cámbialos de rol primero.");
                }
                throw new Error("No se puede eliminar el rol: " + error.message)
            }
        },
        crearAutor: async (parent, { input }, { prisma }) => {
            const existe = await prisma.autor.findFirst({
                where: { nombre: input.nombre }
            });
            //Modificar para el futuro
            if (existe) {
                console.log("Aviso: Ya existe un autor con este nombre.");
            }
            try {
                const nuevoAutor = await prisma.autor.create({
                    data: {
                        nombre: input.nombre,
                        nacionalidad: input.nacionalidad
                    }
                })
                return nuevoAutor
            } catch (error) {
                throw new Error("No se pudo crear el autor: " + error.message)
            }
        },
        actualizarAutor: async (parent, { id, input }, { prisma }) => {
            try {
                const actualizarAutor = await prisma.autor.update({
                    where: { id_autor: Number(id) },
                    data: {
                        nombre: input.nombre,
                        nacionalidad: input.nacionalidad
                    }
                })
                return actualizarAutor
            } catch (error) {
                throw new Error("No se puede actualizar el autor: " + error.message)
            }
        },
        eliminarAutor: async (parent, { id }, { prisma }) => {
            try {
                const eliminarAutor = await prisma.autor.delete({
                    where: { id_autor: Number(id) },
                })
                return "Autor eliminado"
            } catch (error) {
                if (error.code === 'P2003') {
                    throw new Error("No puedes eliminar este autor porque hay libros asociados a él. Cámbialos de autor primero.");
                }
                throw new Error("No se puede eliminar el autor: " + error.message)
            }
        },
        crearUsuario: async (parent, { input }, { prisma }) => {
            const existe = await prisma.usuario.findUnique({ where: { correo: input.correo } })
            if (existe) throw new Error("El correo ya está en uso")
            const salt = await bcryptjs.genSalt(10)
            input.password = await bcryptjs.hash(input.password, salt)
            try {
                const nuevoUsuario = await prisma.usuario.create({
                    data: {
                        correo: input.correo,
                        password: input.password,
                        nombre: input.nombre,
                        apellidos: input.apellidos,
                        rol: {
                            connect: { id_rol: input.id_rol }
                        }
                    },
                    include: { rol: true }
                })
                return nuevoUsuario
            } catch (error) {
                throw new Error("No se pudo crear el usuario: " + error.message)
            }
        },
        actualizarUsuario: async (parent, { id, input }, { prisma }) => {
            try {
                const actualizarUsuario = await prisma.usuario.update({
                    where: { id_usuario: Number(id) },
                    data: {
                        correo: input.correo,
                        password: input.password,
                        nombre: input.nombre,
                        apellidos: input.apellidos,
                        rol: {
                            connect: { id_rol: input.id_rol }
                        }
                    },
                    include: { rol: true }
                })
                return actualizarUsuario
            } catch (error) {
                throw new Error("No se puede actualizar el usuario: " + error.message)
            }
        },
        eliminarUsuario: async (parent, { id }, { prisma }) => {
            try {
                const eliminarUsuario = await prisma.usuario.delete({
                    where: { id_usuario: Number(id) },
                })
                return "Usuario eliminado"
            } catch (error) {
                throw new Error("No se puede eliminar el rol: " + error.message)
            }
        },
        crearLibro: async (parent, { input }, { prisma }) => {
            const existe = await prisma.libro.findUnique({ where: { isbn: input.isbn } })
            if (existe) throw new Error("El libro ya está registrado")
            try {
                const nuevoLibro = await prisma.libro.create({
                    data: {
                        titulo: input.titulo,
                        isbn: input.isbn,
                        fecha_publicacion: input.fecha_publicacion,
                        autor: {
                            connect: { id_autor: input.id_autor }
                        }
                    },
                    include: { autor: true }
                })
                return nuevoLibro
            } catch (error) {
                console.error("Error en crearLibro: ", error)
                throw new Error("No se pudo registrar el libro. Revisa que el ISBN sea único.");
            }
        },
        actualizarLibro: async (parent, { id, input }, { prisma }) => {
            try {
                const actualizarLibro = await prisma.libro.update({
                    where: { id_libro: Number(id) },
                    data: {
                        titulo: input.titulo,
                        isbn: input.isbn,
                        fecha_publicacion: input.fecha_publicacion,
                        autor: {
                            connect: { id_autor: input.id_autor }
                        }
                    },
                    include: { autor: true }
                })
                return actualizarLibro
            } catch (error) {
                throw new Error("No se puede actualizar el libro: " + error.message)
            }
        },
        eliminarLibro: async (parent, { id }, { prisma }) => {
            try {
                const eliminarLibro = await prisma.libro.delete({
                    where: { id_libro: Number(id) },
                })
                return "Libro eliminado"
            } catch (error) {
                throw new Error("No se puede eliminar el libro: " + error.message)
            }
        },
        crearColeccion: async (parent, { input }, { prisma }) => {
            try {
                const nuevaColeccion = await prisma.coleccion.create({
                    data: {
                        estado_lectura: input.estado_lectura,
                        calificacion_personal: Number(input.calificacion_personal),
                        fecha_adquisicion: input.fecha_adquisicion,
                        usuario: {
                            connect: { id_usuario: input.id_usuario }
                        },
                        libro: {
                            connect: { id_libro: input.id_libro }
                        }
                    },
                    include: { usuario: true, libro: true }
                })
                return nuevaColeccion
            } catch (error) {
                console.error("Error en crearLibro: ", error)
                throw new Error("No se pudo crear la colección. Revisa que el ISBN sea único.");
            }
        },
        actualizarColeccion: async (parent, { id, input }, { prisma }) => {
            try {
                const actualizarColeccion = await prisma.coleccion.update({
                    where: { id_coleccion: Number(id) },
                    data: {
                        estado_lectura: input.estado_lectura,
                        calificacion_personal: Number(input.calificacion_personal),
                        fecha_adquisicion: input.fecha_adquisicion,
                        usuario: {
                            connect: { id_usuario: input.id_usuario }
                        },
                        libro: {
                            connect: { id_libro: input.id_libro }
                        }
                    },
                    include: { usuario: true, libro: true }
                })
                return actualizarColeccion
            } catch (error) {
                throw new Error("No se puede actualizar la colección: " + error.message)
            }
        },
        eliminarColeccion: async (parent, { id }, { prisma }) => {
            try {
                const eliminarColeccion = await prisma.coleccion.delete({
                    where: { id_coleccion: Number(id) },
                })
                return "Colección eliminada"
            } catch (error) {
                throw new Error("No se puede eliminar la colección: " + error.message)
            }
        },
    }
};

module.exports = resolvers;