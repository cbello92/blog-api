const _ = require('lodash');

const validateUser = (user) => {
    const validaciones = {};
    if (Object.keys(user).length === 0) {
        return { user : ["Se requiren datos"] };
    }

    if (!user.name) {
        validaciones.name = [
            "El name es requerido",
            "El name debe tener entre 10 y 50 caracteres"
        ];
    } else {
        const largo = user.name.length;
        if (largo < 10 || largo > 50) {
            validaciones.name = [
                "El name debe tener entre 10 y 50 caracteres"
            ];           
        }
    }
    
    if (!user.username) {
        validaciones.username = [
            "El username es requerido",
            "El username debe tener entre 10 y 50 caracteres"
        ];
    } else {
        const largo = user.username.length;
        if (largo < 10 || largo > 50) {
            validaciones.username = [
                "El username debe tener entre 10 y 50 caracteres"
            ];           
        }
    }
    
    if (!user.email) {
        validaciones.email = [
            "El email es requerido",
            "El email debe tener entre 10 y 50 caracteres"
        ];
    } else {
        const largo = user.email.length;
        if (largo < 10 || largo > 50) {
            validaciones.email = [
                "El email debe tener entre 10 y 50 caracteres"
            ];           
        } else {
            if(!_.endsWith(user.email, '.com') && !_.endsWith(user.email, '.cl')) {
                validaciones.email = [
                    "El email debe tener el formato correcto, debe terminar en .com o .cl"
                ];
            }
        }
    }

    if (!user.phone) {
        validaciones.phone = [
            "El phone es requerido",
            "El phone debe tener entre 10 y 30 caracteres"
        ];
    } else {
        const largo = user.phone.length;
        if (largo < 10 || largo > 30) {
            validaciones.phone = [
                "El phone debe tener entre 10 y 30 caracteres"
            ];           
        } else {
            let contador = 0;
            _.toArray(user.phone).forEach(c => {
                if((_.toNumber(c) >= 0 && _.toNumber(c) <= 9) || c == '-') {
                } else {
                    contador++;
                }
            });

            if(contador > 0 || !_.includes(user.phone, '-')) { 
                validaciones.phone = [
                    "El phone debe tener digitos y -"
                ]; 
            } 
        }
    }

    if(!user.website) {
        validaciones.website = [
            "El website debe tener entre 10 y 50 caracteres"
        ];  
    } else {
        const largo = user.website.length;
        if (largo < 10 || largo > 50) {
            validaciones.website = [
                "El website debe tener entre 10 y 50 caracteres"
            ];           
        }
    }

    if (!user.address) {
        validaciones.address = [
            "El address es requerido",
            "El address debe tener entre 10 y 50 caracteres"
        ];
    } else {
        
            if(!user.address.street) {
                validaciones.street = [
                    "El street es requerido",
                    "El street debe tener entre 10 y 50 caracteres"
                ];
            } else {
                const largo = user.address.street.length;
                if (largo < 10 || largo > 50) {
                    validaciones.street = [
                        "El street debe tener entre 10 y 50 caracteres"
                    ];           
                }
            }
    
            if(!user.address.suite) {
                validaciones.suite = [
                    "El suite es requerido",
                    "El suite debe tener entre 10 y 50 caracteres"
                ];
            } else {
                const largo = user.address.suite.length;
                if (largo < 10 || largo > 50) {
                    validaciones.suite = [
                        "El suite debe tener entre 10 y 50 caracteres"
                    ];           
                }
            }
    
            if(!user.address.city) {
                validaciones.city = [
                    "El city es requerido",
                    "El city debe tener entre 10 y 50 caracteres"
                ];
            } else {
                const largo = user.address.city.length;
                if (largo < 10 || largo > 50) {
                    validaciones.city = [
                        "El city debe tener entre 10 y 50 caracteres"
                    ];           
                }
            }
    
            if(!user.address.zipcode) {
                validaciones.zipcode = [
                    "El zipcode es requerido",
                    "El zipcode debe tener entre 10 y 50 caracteres"
                ];
            } else {
                const largo = user.address.zipcode.length;
                if (largo < 10 || largo > 50) {
                    validaciones.webiste = [
                        "El zipcode debe tener entre 10 y 50 caracteres"
                    ];           
                }
            }


            if(!user.address.geo) {
                validaciones.geo = [
                    "El geo requerido",
                ];
            } else {
                
                if(!user.address.geo.lat) {
                    validaciones.lat = [
                        "El geo lat requerido",
                        "El geo lat debe tener entre 10 y 50 caracteres"
                    ];
                } else {
                    const largo = user.address.geo.lat.length;
                    if (largo < 5 || largo > 50) {
                        validaciones.lat = [
                            "El geo lat debe tener entre 10 y 50 caracteres"
                        ];           
                    }
                }

                if(!user.address.geo.lng) {
                    validaciones.lng = [
                        "El geo lng requerido",
                        "El geo lng debe tener entre 10 y 50 caracteres"
                    ];
                } else {
                    const largo = user.address.geo.lng.length;
                    if (largo < 5 || largo > 50) {
                        validaciones.lng = [
                            "El geo lng debe tener entre 10 y 50 caracteres"
                        ];           
                    }
                }
                
            }
    }
        
        if(!user.company) {
            validaciones.company = [
                "company requerido",
            ];
        } else {

            if(!user.company.name) {
                validaciones.companyName = [
                    "El name company requerido",
                    "El name company debe tener entre 10 y 50 caracteres"
                ];
            } else {
                const largo = user.company.name.length;
                if (largo < 10 || largo > 50) {
                    validaciones.companyName = [
                        "El name company debe tener entre 10 y 50 caracteres"
                    ];           
                }
            }

            if(!user.company.catchPhrase) {
                validaciones.catchPhrase = [
                    "El catchPhrase company requerido",
                    "El catchPhrase company debe tener entre 10 y 50 caracteres"
                ];
            } else {
                const largo = user.company.catchPhrase.length;
                if (largo < 10 || largo > 50) {
                    validaciones.catchPhrase = [
                        "El catchPhrase company debe tener entre 10 y 50 caracteres"
                    ];           
                }
            }

            if(!user.company.bs) {
                validaciones.bs = [
                    "El bs company requerido",
                    "El bs company debe tener entre 10 y 50 caracteres"
                ];
            } else {
                const largo = user.company.bs.length;
                if (largo < 10 || largo > 50) {
                    validaciones.bs = [
                        "El bs company debe tener entre 10 y 50 caracteres"
                    ];           
                }
            }
        }


    const tieneErrores = Object.keys(validaciones).length > 0;

    return tieneErrores ? validaciones : undefined;
};

exports.validateUser = validateUser;