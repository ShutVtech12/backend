const gql = require('graphql-tag');

const typeDefs = gql`

    type Token {
        token: String
    }

    type Autor {
        id_autor: ID!
        nombre: String
        nacionalidad: String
    }

    type Rol {
        id_rol: ID!
        nombre_rol: String!
    }

    type Usuario {
        id_usuario: ID!
        correo: String!
        nombre: String
        apellidos: String
        rol: Rol
    }

    type Libro {
        id_libro: ID!
        titulo: String
        isbn: String!
        fecha_publicacion: String
        autor: Autor
    }

    type Coleccion {
        id_coleccion: ID!
        estado_lectura: String
        calificacion_personal: Int
        fecha_adquisicion: String
        usuario: Usuario
        libro: Libro
    }

    type Query{
        #Select * from
        obtenerAutores: [Autor]
        obtenerRoles: [Rol]
        obtenerUsuarios: [Usuario]
        obtenerLibros: [Libro]
        obtenerColecciones: [Coleccion]

        #Select * from - where
        obtenerAutor(id: ID!): Autor
        obtenerRol(id: ID!): Rol
        obtenerUsuario(id: ID!): Usuario
        obtenerLibro(id: ID!): Libro
        obtenerLibroPorISBN(isbn: String!): Libro
        obtenerColeccion(id: ID!): Coleccion

        obtenerUsuariosPorRol(id: ID!): [Usuario]
        obtenerLibrosPorAutor(id: ID!): [Libro]
        obtenerAutorPorNombre(nombre: String!): Autor
        obtenerColeccionesPorUsuario(id: ID!): [Coleccion]
        obtenerColeccionesPorLibro(id: ID!): [Coleccion]
    }

    input RolInput{
        nombre_rol: String!
    }

    input AutorInput{
        nombre: String!
        nacionalidad: String!
    }

    input UsuarioInput{
        correo: String!
        password: String
        nombre: String!
        apellidos: String!
        id_rol: Int
    }

    input AutenticarUsuarioInput{
        correo: String!
        password: String!
    }

    input LibroInput{
        titulo: String!
        isbn: String!
        fecha_publicacion: String!
        id_autor: Int
    }

    input ColeccionInput{
        estado_lectura: String!
        calificacion_personal: Int!
        fecha_adquisicion: String!
        id_usuario: Int!
        id_libro: Int
        id_autor: Int
        titulo_libro: String
        isbn_libro: String
        fecha_libro: String
        nombre_autor: String
        nacionalidad_autor: String
    }

    type Mutation{
        #Rol
        crearRol(input: RolInput): Rol
        actualizarRol(id: ID!, input: RolInput): Rol
        eliminarRol(id: ID!): String
        
        #Autor
        crearAutor(input: AutorInput): Autor
        actualizarAutor(id: ID!, input: AutorInput): Autor
        eliminarAutor(id: ID!): String

        #Usuario
        crearUsuario(input: UsuarioInput): Usuario
        actualizarUsuario(id: ID!, input: UsuarioInput): Usuario
        eliminarUsuario(id: ID!): String
        autenticarUsuario(input: AutenticarUsuarioInput): Token

        #Libro
        crearLibro(input: LibroInput): Libro
        actualizarLibro(id: ID!, input: LibroInput): Libro
        eliminarLibro(id: ID!): String

        #Coleccion
        crearColeccion(input: ColeccionInput): Coleccion
        actualizarColeccion(id: ID!, input: ColeccionInput): Coleccion
        eliminarColeccion(id: ID!): String

    }
`

module.exports = typeDefs