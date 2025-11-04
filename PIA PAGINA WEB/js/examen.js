const params = new URLSearchParams(window.location.search)

const curso = parseInt(params.get('curso'))
const examen = parseInt(params.get('examen'))

document.addEventListener("DOMContentLoaded", () => {
    obtenerExamenActual(curso)
})

function obtenerExamenActual(curso) {
    let examenActual = null

    if (curso === 1) {
        examenActual = curso1
    } else if (curso === 2) {
        examenActual = curso2
    } else if (curso === 3) {
        examenActual = curso3
    } else if (curso === 4) {
        examenActual = curso4
    }

    imprimirExamen(examenActual)
}

function imprimirExamen(examenArray) {
    const form = document.getElementById("form-examen");
    form.innerHTML = "";

    examenArray.forEach((preguntaObj, index) => {
        if (preguntaObj.examen == examen) {
            const preguntaFieldset = document.createElement("fieldset");
            preguntaFieldset.classList.add("pregunta");

            const legend = document.createElement("legend");
            legend.textContent = `${index + 1}. ${preguntaObj.pregunta}`;
            preguntaFieldset.appendChild(legend);

            preguntaObj.respuestas.forEach((respuestaObj, rIndex) => {
                const label = document.createElement("label");
                label.classList.add("respuesta");

                const input = document.createElement("input");
                input.type = "radio";
                input.name = `pregunta-${index}`;
                input.value = respuestaObj.status;

                label.appendChild(input);
                label.appendChild(document.createTextNode(respuestaObj.respuesta));
                preguntaFieldset.appendChild(label);
            });

            form.appendChild(preguntaFieldset);
        }
    });

    const btnEnviar = document.createElement("button");
    btnEnviar.type = "submit";
    btnEnviar.textContent = "Enviar Examen";
    btnEnviar.classList.add("btn-enviar");
    form.appendChild(btnEnviar);
}

document.getElementById("form-examen").addEventListener("submit", function (e) {
    e.preventDefault();

    const form = e.target;
    let correctas = 0;

    const preguntas = form.querySelectorAll("fieldset");
    const total = preguntas.length;

    preguntas.forEach((pregunta) => {
        const seleccionada = pregunta.querySelector("input[type='radio']:checked");
        if (seleccionada && seleccionada.value === "true") {
            correctas++;
        }
    });

    const porcentaje = (correctas / total) * 100;

    // Guardar resultado en localStorage
    const claveResultado = `examen${examen}curso${curso}`;
    localStorage.setItem(claveResultado, porcentaje.toFixed(2));

    // Mostrar mensaje con SweetAlert
    if (porcentaje >= 70) {
        Swal.fire({
            title: "¡Felicidades!",
            text: `Aprobaste con ${correctas} de ${total} respuestas correctas.`,
            icon: "success",
            confirmButtonText: "¡Genial!"
        });
    } else {
        Swal.fire({
            title: "Oops...",
            text: `Reprobaste con ${correctas} de ${total} respuestas correctas.`,
            icon: "error",
            confirmButtonText: "Intentar de nuevo"
        });
    }
});

const curso1 = [
    // Examen 1: Teoría básica de Linux y distros
    {
      pregunta: "¿Qué es Linux?",
      respuestas: [
        { respuesta: "Un sistema operativo completo", status: false },
        { respuesta: "Un núcleo de sistema operativo (kernel)", status: true },
        { respuesta: "Un lenguaje de programación", status: false }
      ],
      examen: 1
    },
    {
      pregunta: "¿Cuál es una de las distribuciones más populares de Linux para principiantes?",
      respuestas: [
        { respuesta: "Arch Linux", status: false },
        { respuesta: "Debian", status: false },
        { respuesta: "Ubuntu", status: true }
      ],
      examen: 1
    },
    {
      pregunta: "¿Qué función tiene el kernel en un sistema operativo?",
      respuestas: [
        { respuesta: "Es una interfaz gráfica", status: false },
        { respuesta: "Controla el hardware y administra recursos", status: true },
        { respuesta: "Es un antivirus", status: false }
      ],
      examen: 1
    },
    {
      pregunta: "¿Qué significa GNU en GNU/Linux?",
      respuestas: [
        { respuesta: "Grupo Nacional de Usuarios", status: false },
        { respuesta: "GNU's Not Unix", status: true },
        { respuesta: "Gestión de Núcleo Universal", status: false }
      ],
      examen: 1
    },
    {
      pregunta: "¿Qué sistema de archivos usa comúnmente Linux?",
      respuestas: [
        { respuesta: "NTFS", status: false },
        { respuesta: "ext4", status: true },
        { respuesta: "FAT32", status: false }
      ],
      examen: 1
    },
    {
      pregunta: "¿Qué entorno de escritorio se usa en Ubuntu por defecto?",
      respuestas: [
        { respuesta: "GNOME", status: true },
        { respuesta: "KDE", status: false },
        { respuesta: "XFCE", status: false }
      ],
      examen: 1
    },
    {
      pregunta: "¿Qué es una distro de Linux?",
      respuestas: [
        { respuesta: "Un entorno de desarrollo", status: false },
        { respuesta: "Una distribución personalizada del sistema", status: true },
        { respuesta: "Un comando de terminal", status: false }
      ],
      examen: 1
    },
  
    // Examen 2: Preparación del entorno y conceptos previos
    {
      pregunta: "¿Qué es una máquina virtual?",
      respuestas: [
        { respuesta: "Un tipo de virus", status: false },
        { respuesta: "Un software que simula un sistema físico", status: true },
        { respuesta: "Una partición del disco", status: false }
      ],
      examen: 2
    },
    {
      pregunta: "¿Cuál de los siguientes es un software de virtualización?",
      respuestas: [
        { respuesta: "VirtualBox", status: true },
        { respuesta: "Microsoft Word", status: false },
        { respuesta: "WinRAR", status: false }
      ],
      examen: 2
    },
    {
      pregunta: "¿Qué función cumple una ISO?",
      respuestas: [
        { respuesta: "Acelerar el rendimiento del PC", status: false },
        { respuesta: "Crear usuarios en Linux", status: false },
        { respuesta: "Contener una imagen de un sistema operativo", status: true }
      ],
      examen: 2
    },
    {
      pregunta: "¿Qué se necesita para crear un USB booteable?",
      respuestas: [
        { respuesta: "Un disco duro externo", status: false },
        { respuesta: "Una ISO y un programa como Rufus", status: true },
        { respuesta: "Un cable HDMI", status: false }
      ],
      examen: 2
    },
    {
      pregunta: "¿Qué es una BIOS o UEFI?",
      respuestas: [
        { respuesta: "Un sistema operativo", status: false },
        { respuesta: "La interfaz del sistema Linux", status: false },
        { respuesta: "Un firmware que permite arrancar el sistema", status: true }
      ],
      examen: 2
    },
    {
      pregunta: "¿Qué se recomienda hacer antes de instalar Linux?",
      respuestas: [
        { respuesta: "Formatear sin respaldo", status: false },
        { respuesta: "Crear un respaldo de tus archivos", status: true },
        { respuesta: "Eliminar la BIOS", status: false }
      ],
      examen: 2
    },
  
    // Examen 3: Proceso de instalación de Linux
    {
      pregunta: "¿Qué opción debemos seleccionar en el booteo para iniciar desde el USB?",
      respuestas: [
        { respuesta: "HDD", status: false },
        { respuesta: "UEFI USB", status: true },
        { respuesta: "CD-ROM", status: false }
      ],
      examen: 3
    },
    {
      pregunta: "¿Qué tipo de instalación se recomienda para usuarios nuevos?",
      respuestas: [
        { respuesta: "Instalación mínima", status: false },
        { respuesta: "Instalación personalizada con particiones", status: false },
        { respuesta: "Instalación automática o completa", status: true }
      ],
      examen: 3
    },
    {
      pregunta: "¿Qué debe tener el USB booteable para que funcione?",
      respuestas: [
        { respuesta: "Un archivo PDF", status: false },
        { respuesta: "Una imagen ISO del sistema operativo", status: true },
        { respuesta: "Drivers de Windows", status: false }
      ],
      examen: 3
    },
    {
      pregunta: "¿Qué ocurre si seleccionas 'borrar disco e instalar Linux'?",
      respuestas: [
        { respuesta: "Se guarda todo en la nube", status: false },
        { respuesta: "Se formatea todo el disco", status: true },
        { respuesta: "Se crea una copia de seguridad", status: false }
      ],
      examen: 3
    },
    {
      pregunta: "¿Qué se configura normalmente durante la instalación?",
      respuestas: [
        { respuesta: "Solo la red", status: false },
        { respuesta: "Zona horaria, usuario y contraseña", status: true },
        { respuesta: "Juegos y temas", status: false }
      ],
      examen: 3
    },
    {
      pregunta: "¿Qué indica que la instalación de Linux ha finalizado correctamente?",
      respuestas: [
        { respuesta: "Aparece el login o el escritorio", status: true },
        { respuesta: "Se apaga el equipo", status: false },
        { respuesta: "Se elimina la BIOS", status: false }
      ],
      examen: 3
    }
];

const curso2 = [
    // Examen 1: Estructura del sistema de archivos en Linux
    {
      pregunta: "¿Cuál es la función principal del directorio /etc en Linux?",
      respuestas: [
        { respuesta: "Almacenar archivos personales", status: false },
        { respuesta: "Contiene archivos de configuración del sistema", status: true },
        { respuesta: "Guardar archivos temporales", status: false }
      ],
      examen: 1
    },
    {
      pregunta: "¿Qué contiene el directorio /home?",
      respuestas: [
        { respuesta: "Archivos de sistema", status: false },
        { respuesta: "Configuración de red", status: false },
        { respuesta: "Carpetas personales de los usuarios", status: true }
      ],
      examen: 1
    },
    {
      pregunta: "¿Cuál es el propósito del directorio /usr en Linux?",
      respuestas: [
        { respuesta: "Almacenar información de los usuarios", status: false },
        { respuesta: "Contiene programas y recursos del sistema", status: true },
        { respuesta: "Controla la conexión a Internet", status: false }
      ],
      examen: 1
    },
    {
      pregunta: "¿Qué directorio se utiliza para montar dispositivos externos?",
      respuestas: [
        { respuesta: "/dev", status: false },
        { respuesta: "/mnt o /media", status: true },
        { respuesta: "/var", status: false }
      ],
      examen: 1
    },
    {
      pregunta: "¿Qué representa el directorio /proc?",
      respuestas: [
        { respuesta: "Archivos personales", status: false },
        { respuesta: "Sistema de archivos virtual con información del kernel", status: true },
        { respuesta: "Configuración de aplicaciones", status: false }
      ],
      examen: 1
    },
    {
      pregunta: "¿Qué contiene el directorio /bin?",
      respuestas: [
        { respuesta: "Aplicaciones de terceros", status: false },
        { respuesta: "Comandos esenciales del sistema disponibles para todos los usuarios", status: true },
        { respuesta: "Configuraciones de red", status: false }
      ],
      examen: 1
    },
    {
      pregunta: "¿Qué tipo de archivos se almacenan en /var?",
      respuestas: [
        { respuesta: "Archivos de configuración", status: false },
        { respuesta: "Archivos temporales del sistema, logs, bases de datos", status: true },
        { respuesta: "Dispositivos del sistema", status: false }
      ],
      examen: 1
    },
    {
      pregunta: "¿Qué hace el directorio /dev?",
      respuestas: [
        { respuesta: "Contiene configuraciones de usuario", status: false },
        { respuesta: "Contiene archivos especiales que representan dispositivos", status: true },
        { respuesta: "Sirve para guardar archivos multimedia", status: false }
      ],
      examen: 1
    },
  
    // Examen 2: Personalización del entorno gráfico en Linux
    {
      pregunta: "¿Qué puedes personalizar en un entorno gráfico de Linux?",
      respuestas: [
        { respuesta: "Fondo de pantalla, temas e iconos", status: true },
        { respuesta: "BIOS y hardware", status: false },
        { respuesta: "Núcleo del sistema", status: false }
      ],
      examen: 2
    },
    {
      pregunta: "¿Qué sitio puedes visitar para descargar nuevos temas o iconos?",
      respuestas: [
        { respuesta: "gnome-look.org", status: true },
        { respuesta: "linux-terminal.org", status: false },
        { respuesta: "bash-scripts.com", status: false }
      ],
      examen: 2
    },
    {
      pregunta: "¿Qué puedes hacer para mejorar el rendimiento si tu equipo es lento?",
      respuestas: [
        { respuesta: "Activar efectos 3D", status: false },
        { respuesta: "Reducir animaciones o cambiar a un entorno ligero", status: true },
        { respuesta: "Instalar más iconos", status: false }
      ],
      examen: 2
    },
    {
      pregunta: "¿Qué función tiene la barra de tareas o panel en el entorno gráfico?",
      respuestas: [
        { respuesta: "Modificar archivos del sistema", status: false },
        { respuesta: "Acceso rápido a aplicaciones y notificaciones", status: true },
        { respuesta: "Controlar el hardware directamente", status: false }
      ],
      examen: 2
    },
    {
      pregunta: "¿Cuál es el propósito del menú de configuración del sistema?",
      respuestas: [
        { respuesta: "Ver videos", status: false },
        { respuesta: "Ajustar el aspecto, conectividad, usuarios, etc.", status: true },
        { respuesta: "Actualizar controladores automáticamente", status: false }
      ],
      examen: 2
    },
    {
      pregunta: "¿Qué es un entorno de escritorio (Desktop Environment) en Linux?",
      respuestas: [
        { respuesta: "El núcleo del sistema", status: false },
        { respuesta: "El conjunto de herramientas gráficas como escritorios, ventanas y paneles", status: true },
        { respuesta: "Un programa para editar texto", status: false }
      ],
      examen: 2
    },
    {
      pregunta: "¿Qué archivo de imagen puedes usar para cambiar el fondo de pantalla?",
      respuestas: [
        { respuesta: "Solo .exe", status: false },
        { respuesta: "Archivos de imagen como .jpg o .webp", status: true },
        { respuesta: "Solo .zip", status: false }
      ],
      examen: 2
    },
  
    // Examen 3: Conectividad, redes y software
    {
      pregunta: "¿Cómo se conecta Linux a Internet a través de Wi-Fi?",
      respuestas: [
        { respuesta: "Usando la terminal exclusivamente", status: false },
        { respuesta: "A través del panel de red en la interfaz gráfica", status: true },
        { respuesta: "No se puede conectar por Wi-Fi", status: false }
      ],
      examen: 3
    },
    {
      pregunta: "¿Qué herramienta gráfica puedes usar para instalar programas fácilmente en Linux?",
      respuestas: [
        { respuesta: "Gestor de particiones", status: false },
        { respuesta: "Tienda de software", status: true },
        { respuesta: "Firewall", status: false }
      ],
      examen: 3
    },
    {
      pregunta: "¿Qué es un archivo .deb?",
      respuestas: [
        { respuesta: "Un archivo multimedia", status: false },
        { respuesta: "Un paquete de instalación para distribuciones basadas en Debian", status: true },
        { respuesta: "Un tipo de documento", status: false }
      ],
      examen: 3
    },
    {
      pregunta: "¿Qué es Flatpak o Snap?",
      respuestas: [
        { respuesta: "Sistemas de archivos", status: false },
        { respuesta: "Sistemas universales de empaquetado de aplicaciones", status: true },
        { respuesta: "Tipos de red", status: false }
      ],
      examen: 3
    },
    {
      pregunta: "¿Para qué sirve Samba en Linux?",
      respuestas: [
        { respuesta: "Configurar el firewall", status: false },
        { respuesta: "Compartir archivos con otros equipos, incluso Windows", status: true },
        { respuesta: "Actualizar el sistema", status: false }
      ],
      examen: 3
    },
    {
      pregunta: "¿Qué ajustes puedes hacer desde el menú de red en Linux?",
      respuestas: [
        { respuesta: "Instalar paquetes", status: false },
        { respuesta: "Cambiar el nombre de host, configurar DNS o VPN", status: true },
        { respuesta: "Eliminar usuarios", status: false }
      ],
      examen: 3
    },
    {
      pregunta: "¿Cuál es una ventaja de usar AppImage?",
      respuestas: [
        { respuesta: "Se necesita compilarlo manualmente", status: false },
        { respuesta: "Se ejecuta sin necesidad de instalación", status: true },
        { respuesta: "Requiere conexión a Internet para funcionar", status: false }
      ],
      examen: 3
    }
];

const curso3 = [
    // Examen 1
    {
      pregunta: "¿Qué es una terminal en Linux?",
      respuestas: [
        { respuesta: "Es una interfaz gráfica de usuario", status: false },
        { respuesta: "Es una interfaz de texto donde se escriben comandos", status: true },
        { respuesta: "Es un sistema operativo", status: false }
      ],
      examen: 1
    },
    {
      pregunta: "¿Qué es Bash?",
      respuestas: [
        { respuesta: "Es un editor de texto", status: false },
        { respuesta: "Es un shell que interpreta los comandos", status: true },
        { respuesta: "Es un entorno gráfico", status: false }
      ],
      examen: 1
    },
    {
      pregunta: "¿Qué comando se usa para ver el contenido de un directorio?",
      respuestas: [
        { respuesta: "ls", status: true },
        { respuesta: "cd", status: false },
        { respuesta: "pwd", status: false }
      ],
      examen: 1
    },
  
    {
        pregunta: "¿Qué hace el comando 'pwd'?",
        respuestas: [
            { respuesta: "Muestra el contenido de un directorio", status: false },
            { respuesta: "Muestra en qué directorio estás actualmente", status: true },
            { respuesta: "Cambia de directorio", status: false }
        ],
        examen: 1
    },
    {
        pregunta: "¿Cómo te mueves a un directorio llamado 'Documentos'?",
        respuestas: [
            { respuesta: "cd Documentos", status: true },
            { respuesta: "move Documentos", status: false },
            { respuesta: "cd /home/Documentos", status: false }
        ],
        examen: 1
    },
    {
        pregunta: "¿Cómo puedes listar todos los archivos, incluidos los ocultos?",
        respuestas: [
            { respuesta: "ls -l", status: false },
            { respuesta: "ls -a", status: false },
            { respuesta: "ls -la", status: true }
        ],
        examen: 1
    },
    
    {
        pregunta: "¿Qué comando se usa para crear un archivo vacío?",
        respuestas: [
            { respuesta: "mkdir", status: false },
            { respuesta: "touch", status: true },
            { respuesta: "create", status: false }
        ],
        examen: 1
    },

    // Examen 2
    {
      pregunta: "¿Cómo se elimina un archivo en Linux?",
      respuestas: [
        { respuesta: "rm archivo.txt", status: true },
        { respuesta: "delete archivo.txt", status: false },
        { respuesta: "remove archivo.txt", status: false }
      ],
      examen: 2
    },
    {
      pregunta: "¿Qué hace el comando 'rm -r'?",
      respuestas: [
        { respuesta: "Elimina un archivo", status: false },
        { respuesta: "Elimina una carpeta vacía", status: false },
        { respuesta: "Elimina una carpeta con su contenido", status: true }
      ],
      examen: 2
    },
  
    {
      pregunta: "¿Qué hace el comodín '*' en un comando?",
      respuestas: [
        { respuesta: "Representa un solo carácter", status: false },
        { respuesta: "Representa cero o más caracteres", status: true },
        { respuesta: "Representa un archivo específico", status: false }
      ],
      examen: 2
    },
    {
      pregunta: "¿Qué comando se usa para ver las primeras líneas de un archivo?",
      respuestas: [
        { respuesta: "head", status: true },
        { respuesta: "top", status: false },
        { respuesta: "cat", status: false }
      ],
      examen: 2
    },
    {
      pregunta: "¿Cómo puedes ver el tipo de archivo de 'imagen.webp'?",
      respuestas: [
        { respuesta: "file imagen.webp", status: true },
        { respuesta: "type imagen.webp", status: false },
        { respuesta: "cat imagen.webp", status: false }
      ],
      examen: 2
    },

    {
        pregunta: "¿Qué comando se utiliza para cambiar los permisos de un archivo en Linux?",
        respuestas: [
            { respuesta: "chmod", status: true },
            { respuesta: "chown", status: false },
            { respuesta: "ls", status: false }
        ],
        examen: 2
    },
    {
        pregunta: "¿Qué hace el comando 'chmod 755 archivo.txt'?",
        respuestas: [
            { respuesta: "Le da permisos de lectura, escritura y ejecución al propietario, y de lectura y ejecución al grupo y otros", status: true },
            { respuesta: "Elimina el archivo 'archivo.txt'", status: false },
            { respuesta: "Cambia el nombre del archivo 'archivo.txt'", status: false }
        ],
        examen: 2
    },
    // Examen 3
    {
        pregunta: "¿Cuál es la función del comando 'chown'?",
        respuestas: [
            { respuesta: "Cambia el propietario de un archivo o directorio", status: true },
            { respuesta: "Elimina un archivo o directorio", status: false },
            { respuesta: "Muestra los detalles de los archivos", status: false }
        ],
        examen: 3
    },
    {
        pregunta: "¿Qué hace el comando 'umask'?",
        respuestas: [
            { respuesta: "Define los permisos predeterminados para los nuevos archivos y directorios", status: true },
            { respuesta: "Muestra los permisos de un archivo", status: false },
            { respuesta: "Cambia el propietario de un archivo", status: false }
        ],
        examen: 3
    },
    {
        pregunta: "¿Cómo se cambia el grupo de un archivo con el comando 'chgrp'?",
        respuestas: [
            { respuesta: "chgrp nuevo_grupo archivo.txt", status: true },
            { respuesta: "chown archivo.txt nuevo_grupo", status: false },
            { respuesta: "chmod nuevo_grupo archivo.txt", status: false }
        ],
        examen: 3
    },

    {
        pregunta: "¿Qué hace el comando 'find' en Linux?",
        respuestas: [
            { respuesta: "Busca archivos en el sistema de archivos", status: true },
            { respuesta: "Muestra el contenido de un archivo", status: false },
            { respuesta: "Elimina un archivo", status: false }
        ],
        examen: 3
    },
    {
        pregunta: "¿Qué comando se usa para buscar un texto dentro de un archivo?",
        respuestas: [
            { respuesta: "grep", status: true },
            { respuesta: "locate", status: false },
            { respuesta: "wc", status: false }
        ],
        examen: 3
    },
    {
        pregunta: "¿Cuál es el comando para ver la fecha y hora actuales?",
        respuestas: [
            { respuesta: "date", status: true },
            { respuesta: "cal", status: false },
            { respuesta: "time", status: false }
        ],
        examen: 3
    },
    {
        pregunta: "¿Qué hace el comando 'diff'?",
        respuestas: [
            { respuesta: "Compara dos archivos y muestra las diferencias línea por línea", status: true },
            { respuesta: "Muestra el contenido de un archivo", status: false },
            { respuesta: "Cuenta las líneas de un archivo", status: false }
        ],
        examen: 3
    },
    {
        pregunta: "¿Qué hace el comando 'wc' en Linux?",
        respuestas: [
            { respuesta: "Cuenta líneas, palabras y caracteres de un archivo", status: true },
            { respuesta: "Muestra el contenido de un archivo", status: false },
            { respuesta: "Compara dos archivos", status: false }
        ],
        examen: 3
    }
];

const curso4 = [
    // Examen 1
    {
        pregunta: "¿Qué comando se usa para instalar un paquete en sistemas basados en Debian (como Ubuntu)?",
        respuestas: [
            { respuesta: "apt install", status: true },
            { respuesta: "pacman -S", status: false },
            { respuesta: "dnf install", status: false }
        ],
        examen: 1
    },
    {
        pregunta: "¿Cuál es la diferencia entre los comandos 'apt remove' y 'apt purge'?",
        respuestas: [
            { respuesta: "remove elimina el paquete, purge elimina el paquete y sus archivos de configuración", status: true },
            { respuesta: "remove elimina el paquete y purge solo desinstala", status: false },
            { respuesta: "No hay diferencia", status: false }
        ],
        examen: 1
    },
    {
        pregunta: "¿Qué comando se utiliza para buscar paquetes disponibles en un sistema basado en Debian?",
        respuestas: [
            { respuesta: "apt search nombre", status: true },
            { respuesta: "dnf search nombre", status: false },
            { respuesta: "pacman -Ss nombre", status: false }
        ],
        examen: 1
    },
    {
        pregunta: "¿Qué hace el comando 'apt show nombre'?",
        respuestas: [
            { respuesta: "Muestra detalles sobre el paquete", status: true },
            { respuesta: "Instala el paquete", status: false },
            { respuesta: "Elimina el paquete", status: false }
        ],
        examen: 1
    },
    {
        pregunta: "¿Qué significa usar 'sudo' antes de un comando?",
        respuestas: [
            { respuesta: "Ejecuta el comando con privilegios de administrador", status: true },
            { respuesta: "Ejecuta el comando sin necesidad de permisos", status: false },
            { respuesta: "El comando no funciona si no se usa sudo", status: false }
        ],
        examen: 1
    },

    {
        pregunta: "¿Qué comando usarías para instalar 'neofetch' en un sistema basado en Debian?",
        respuestas: [
            { respuesta: "sudo apt install neofetch", status: true },
            { respuesta: "sudo dnf install neofetch", status: false },
            { respuesta: "sudo pacman -S neofetch", status: false }
        ],
        examen: 1
    },
    {
        pregunta: "¿Qué comando se usa para instalar 'htop' en sistemas basados en Red Hat?",
        respuestas: [
            { respuesta: "sudo dnf install htop", status: true },
            { respuesta: "sudo apt install htop", status: false },
            { respuesta: "sudo pacman -S htop", status: false }
        ],
        examen: 1
    },
    {
        pregunta: "¿Cuál es el comando correcto para instalar 'vim' en un sistema basado en Arch Linux?",
        respuestas: [
            { respuesta: "sudo pacman -S vim", status: true },
            { respuesta: "sudo apt install vim", status: false },
            { respuesta: "sudo dnf install vim", status: false }
        ],
        examen: 1
    },
    {
        pregunta: "¿Qué comando usarías para eliminar un paquete llamado 'example' sin eliminar sus archivos de configuración?",
        respuestas: [
            { respuesta: "sudo apt remove example", status: true },
            { respuesta: "sudo apt purge example", status: false },
            { respuesta: "sudo dnf remove example", status: false }
        ],
        examen: 1
    },
    {
        pregunta: "¿Por qué es importante usar 'sudo' con responsabilidad?",
        respuestas: [
            { respuesta: "Porque otorga privilegios de administrador que pueden modificar o dañar el sistema", status: true },
            { respuesta: "Porque sudo siempre es necesario para ejecutar comandos", status: false },
            { respuesta: "Porque hace que los comandos se ejecuten más rápido", status: false }
        ],
        examen: 1
    },
    // Examen 2
    {
        pregunta: "¿Cuál es el comando correcto para instalar un paquete usando APT en Ubuntu/Debian?",
        respuestas: [
            { respuesta: "sudo apt install nombre-paquete", status: true },
            { respuesta: "sudo apt add nombre-paquete", status: false },
            { respuesta: "sudo apt update nombre-paquete", status: false }
        ],
        examen: 2
    },
    {
        pregunta: "¿Qué comando se usa para eliminar un paquete con APT, pero mantener sus archivos de configuración?",
        respuestas: [
            { respuesta: "sudo apt remove nombre-paquete", status: true },
            { respuesta: "sudo apt purge nombre-paquete", status: false },
            { respuesta: "sudo apt delete nombre-paquete", status: false }
        ],
        examen: 2
    },
    {
        pregunta: "¿Cómo se actualiza la lista de paquetes disponibles en APT?",
        respuestas: [
            { respuesta: "sudo apt update", status: true },
            { respuesta: "sudo apt upgrade", status: false },
            { respuesta: "sudo apt refresh", status: false }
        ],
        examen: 2
    },
    {
        pregunta: "¿Cuál es el comando correcto para actualizar todos los paquetes instalados a sus últimas versiones?",
        respuestas: [
            { respuesta: "sudo apt upgrade", status: true },
            { respuesta: "sudo apt update", status: false },
            { respuesta: "sudo apt full-upgrade", status: false }
        ],
        examen: 2
    },
    {
        pregunta: "¿Qué comando usarías para eliminar dependencias que ya no son necesarias en APT?",
        respuestas: [
            { respuesta: "sudo apt autoremove", status: true },
            { respuesta: "sudo apt remove --unnecessary", status: false },
            { respuesta: "sudo apt purge --unused", status: false }
        ],
        examen: 2
    },
    {
        pregunta: "¿Qué comando se usa para limpiar el caché de los paquetes descargados en APT?",
        respuestas: [
            { respuesta: "sudo apt clean", status: true },
            { respuesta: "sudo apt autoclean", status: false },
            { respuesta: "sudo apt purge", status: false }
        ],
        examen: 2
    },
    {
        pregunta: "¿Cómo se actualiza un solo paquete específico sin afectar al resto del sistema?",
        respuestas: [
            { respuesta: "sudo apt install --only-upgrade nombre-paquete", status: true },
            { respuesta: "sudo apt upgrade nombre-paquete", status: false },
            { respuesta: "sudo apt update nombre-paquete", status: false }
        ],
        examen: 2
    },
    {
        pregunta: "¿Qué comando usarías para verificar si hay dependencias rotas en tu sistema con APT?",
        respuestas: [
            { respuesta: "sudo apt check", status: true },
            { respuesta: "sudo apt verify", status: false },
            { respuesta: "sudo apt fix", status: false }
        ],
        examen: 2
    },
    {
        pregunta: "¿Qué comando se utiliza para corregir dependencias rotas en APT?",
        respuestas: [
            { respuesta: "sudo apt install -f", status: true },
            { respuesta: "sudo apt fix", status: false },
            { respuesta: "sudo apt remove -f", status: false }
        ],
        examen: 2
    },
    {
        pregunta: "¿Cómo verías una lista de todos los paquetes instalados en tu sistema usando APT?",
        respuestas: [
            { respuesta: "apt list --installed", status: true },
            { respuesta: "apt show --installed", status: false },
            { respuesta: "apt search --installed", status: false }
        ],
        examen: 2
    }
];
