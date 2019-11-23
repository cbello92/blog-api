const { assert } = require('chai');
const validateUser = require('../../validadores/user');
const userRepositorio = require('../../repositorio/users');

describe('VALIDADOR USER - API', () => {
  it('El campo name es requerido', () => {
    const data = {
      "name": "",
      "username": "Bret.bret.bret",
      "email": "Sincere@april.com",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 5562222",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "phone": "1-770-736-8031",
      "website": "hildegard.org",
      "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }
    };

    const validaciones = validateUser.validateUser(data);
    assert.isObject(validaciones);
    assert.hasAllKeys(validaciones, ["name"]);
    assert.isArray(validaciones.name);
    assert.isNotEmpty(validaciones.name);
  });

  it('El campo name debe tener entre 10 y 50 caracteres', () => {
    const data = {
      "name": "name",
      "username": "Bret.bret.bret",
      "email": "Sincere@april.com",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 5562222",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "phone": "1-770-736-8031",
      "website": "hildegard.org",
      "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }
    };

    const validaciones = validateUser.validateUser(data);
    assert.isObject(validaciones);
    assert.hasAllKeys(validaciones, ["name"]);
    assert.isArray(validaciones.name);
    assert.isNotEmpty(validaciones.name);
  });



  it('El campo username es requerido', () => {
    const data = {
      "name": "Camilo Bello Peñailillo",
      "email": "Sincere@april.com",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 5562222",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "phone": "1-770-736-8031",
      "website": "hildegard.org",
      "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }
    };

    const validaciones = validateUser.validateUser(data);
    assert.isObject(validaciones);
    assert.hasAllKeys(validaciones, ["username"]);
    assert.isArray(validaciones.username);
    assert.isNotEmpty(validaciones.username);
  });

  it('El campo username debe tener entre 10 y 50 caracteres', () => {
    const data = {
      "name": "Camilo Bello Peñailillo",
      "username": "cam",
      "email": "Sincere@april.com",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 5562222",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "phone": "1-770-736-8031",
      "website": "hildegard.org",
      "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }
    };

    const validaciones = validateUser.validateUser(data);
    assert.isObject(validaciones);
    assert.hasAllKeys(validaciones, ["username"]);
    assert.isArray(validaciones.username);
    assert.isNotEmpty(validaciones.username);
  });



  it('El campo email es requerido', () => {
    const data = {
      "name": "Camilo Bello Peñailillo",
      "username": "camilo.bello",
      "email": "",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 5562222",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "phone": "1-770-736-8031",
      "website": "hildegard.org",
      "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }
    };

    const validaciones = validateUser.validateUser(data);
    assert.isObject(validaciones);
    assert.hasAllKeys(validaciones, ["email"]);
    assert.isArray(validaciones.email);
    assert.isNotEmpty(validaciones.email);
  });



  it('El campo email debe tener entre 10 y 50 caracteres', () => {
    const data = {
      "name": "Camilo Bello Peñailillo",
      "username": "camilo.bello",
      "email": "c@j.com",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 5562222",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "phone": "1-770-736-8031",
      "website": "hildegard.org",
      "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }
    };

    const validaciones = validateUser.validateUser(data);
    assert.isObject(validaciones);
    assert.hasAllKeys(validaciones, ["email"]);
    assert.isArray(validaciones.email);
    assert.isNotEmpty(validaciones.email);
  });


  it('El campo email debe terminar en .com o .cl', () => {
    const data = {
      "name": "Camilo Bello Peñailillo",
      "username": "camilo.bello",
      "email": "camilo.bello@hotmail.net",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 5562222",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "phone": "1-770-736-8031",
      "website": "hildegard.org",
      "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }
    };

    const validaciones = validateUser.validateUser(data);
    assert.isObject(validaciones);
    assert.hasAllKeys(validaciones, ["email"]);
    assert.isArray(validaciones.email);
    assert.isNotEmpty(validaciones.email);
  });



  it('El campo phone es requerido', () => {
    const data = {
      "name": "Camilo Bello Peñailillo",
      "username": "camilo.bello",
      "email": "camilo.bello@hotmail.com",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 5562222",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "phone": "",
      "website": "hildegard.org",
      "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }
    };

    const validaciones = validateUser.validateUser(data);
    assert.isObject(validaciones);
    assert.hasAllKeys(validaciones, ["phone"]);
    assert.isArray(validaciones.phone);
    assert.isNotEmpty(validaciones.phone);
  });


  it('El campo phone debe tener entre 10 y 30 caracteres', () => {
    const data = {
      "name": "Camilo Bello Peñailillo",
      "username": "camilo.bello",
      "email": "camilo.bello@hotmail.com",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 5562222",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "phone": "124-32",
      "website": "hildegard.org",
      "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }
    };

    const validaciones = validateUser.validateUser(data);
    assert.isObject(validaciones);
    assert.hasAllKeys(validaciones, ["phone"]);
    assert.isArray(validaciones.phone);
    assert.isNotEmpty(validaciones.phone);
  });


  it('El campo phone debe contener solo digitos y guiones', () => {
    const data = {
      "name": "Camilo Bello Peñailillo",
      "username": "camilo.bello",
      "email": "camilo.bello@hotmail.com",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 5562222",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "phone": "124-3211221 -aasd",
      "website": "hildegard.org",
      "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }
    };

    const validaciones = validateUser.validateUser(data);
    assert.isObject(validaciones);
    assert.hasAllKeys(validaciones, ["phone"]);
    assert.isArray(validaciones.phone);
    assert.isNotEmpty(validaciones.phone);
  });


  it('El campo website es requerido', () => {
    const data = {
      "name": "Camilo Bello Peñailillo",
      "username": "camilo.bello",
      "email": "camilo.bello@hotmail.com",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 5562222",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "phone": "124-3211221-3321",
      "website": "",
      "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }
    };

    const validaciones = validateUser.validateUser(data);
    assert.isObject(validaciones);
    assert.hasAllKeys(validaciones, ["website"]);
    assert.isArray(validaciones.website);
    assert.isNotEmpty(validaciones.website);
  });


  it('El campo website es debe tener entre 10 y 50 caracteres', () => {
    const data = {
      "name": "Camilo Bello Peñailillo",
      "username": "camilo.bello",
      "email": "camilo.bello@hotmail.com",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 5562222",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "phone": "124-3211221-3321",
      "website": "www",
      "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }
    };

    const validaciones = validateUser.validateUser(data);
    assert.isObject(validaciones);
    assert.hasAllKeys(validaciones, ["website"]);
    assert.isArray(validaciones.website);
    assert.isNotEmpty(validaciones.website);
  });



  it('El campo address requerido', () => {
    const data = {
      "name": "Camilo Bello Peñailillo",
      "username": "camilo.bello",
      "email": "camilo.bello@hotmail.com",
      // "address": {
      //   "street": "Kulas Light",
      //   "suite": "Apt. 5562222",
      //   "city": "Gwenborough",
      //   "zipcode": "92998-3874",
      //   "geo": {
      //     "lat": "-37.3159",
      //     "lng": "81.1496"
      //   }
      // },
      "phone": "124-3211221-3321",
      "website": "www.miweb.cl",
      "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }
    };

    const validaciones = validateUser.validateUser(data);
    assert.isObject(validaciones);
    assert.hasAllKeys(validaciones, ["address"]);
    assert.isArray(validaciones.address);
    assert.isNotEmpty(validaciones.address);
  });


  it('El campo address-street requerido', () => {
    const data = {
      "name": "Camilo Bello Peñailillo",
      "username": "camilo.bello",
      "email": "camilo.bello@hotmail.com",
      "address": {
        // "street": "Kulas Light",
        "suite": "Apt. 5562222",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "phone": "124-3211221-3321",
      "website": "www.miweb.cl",
      "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }
    };

    const validaciones = validateUser.validateUser(data);
    assert.isObject(validaciones);
    assert.hasAllKeys(validaciones, ["street"]);
    assert.isArray(validaciones.street);
    assert.isNotEmpty(validaciones.street);
  });

  it('El campo address-suite requerido', () => {
    const data = {
      "name": "Camilo Bello Peñailillo",
      "username": "camilo.bello",
      "email": "camilo.bello@hotmail.com",
      "address": {
        "street": "Kulas Light",
        // "suite": "Apt. 5562222",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "phone": "124-3211221-3321",
      "website": "www.miweb.cl",
      "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }
    };

    const validaciones = validateUser.validateUser(data);
    assert.isObject(validaciones);
    assert.hasAllKeys(validaciones, ["suite"]);
    assert.isArray(validaciones.suite);
    assert.isNotEmpty(validaciones.suite);
  });




  it('El campo address-city requerido', () => {
    const data = {
      "name": "Camilo Bello Peñailillo",
      "username": "camilo.bello",
      "email": "camilo.bello@hotmail.com",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 5562222",
        // "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "phone": "124-3211221-3321",
      "website": "www.miweb.cl",
      "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }
    };

    const validaciones = validateUser.validateUser(data);
    assert.isObject(validaciones);
    assert.hasAllKeys(validaciones, ["city"]);
    assert.isArray(validaciones.city);
    assert.isNotEmpty(validaciones.city);
  });


  it('El campo address-zipcode requerido', () => {
    const data = {
      "name": "Camilo Bello Peñailillo",
      "username": "camilo.bello",
      "email": "camilo.bello@hotmail.com",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 5562222",
        "city": "Gwenborough",
        // "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "phone": "124-3211221-3321",
      "website": "www.miweb.cl",
      "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }
    };

    const validaciones = validateUser.validateUser(data);
    assert.isObject(validaciones);
    assert.hasAllKeys(validaciones, ["zipcode"]);
    assert.isArray(validaciones.zipcode);
    assert.isNotEmpty(validaciones.zipcode);
  });

  it('El campo address-geo requerido', () => {
    const data = {
      "name": "Camilo Bello Peñailillo",
      "username": "camilo.bello",
      "email": "camilo.bello@hotmail.com",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 5562222",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        // "geo": {
        //   "lat": "-37.3159",
        //   "lng": "81.1496"
        // }
      },
      "phone": "124-3211221-3321",
      "website": "www.miweb.cl",
      "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }
    };

    const validaciones = validateUser.validateUser(data);
    assert.isObject(validaciones);
    assert.hasAllKeys(validaciones, ["geo"]);
    assert.isArray(validaciones.geo);
    assert.isNotEmpty(validaciones.geo);
  });


  it('El campo company es requerido', () => {
    const data = {
      "name": "Camilo Bello Peñailillo",
      "username": "camilo.bello",
      "email": "camilo.bello@hotmail.com",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 5562222",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "phone": "124-3211221-3321",
      "website": "www.miweb.cl",
      // "company": {
      //   "name": "Romaguera-Crona",
      //   "catchPhrase": "Multi-layered client-server neural-net",
      //   "bs": "harness real-time e-markets"
      // }
    };

    const validaciones = validateUser.validateUser(data);
    assert.isObject(validaciones);
    assert.hasAllKeys(validaciones, ["company"]);
    assert.isArray(validaciones.company);
    assert.isNotEmpty(validaciones.company);
  });

  it('El campo company-name es requerido', () => {
    const data = {
      "name": "Camilo Bello Peñailillo",
      "username": "camilo.bello",
      "email": "camilo.bello@hotmail.com",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 5562222",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "phone": "124-3211221-3321",
      "website": "www.miweb.cl",
      "company": {
        // "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }
    };

    const validaciones = validateUser.validateUser(data);
    assert.isObject(validaciones);
    assert.hasAllKeys(validaciones, ["companyName"]);
    assert.isArray(validaciones.companyName);
    assert.isNotEmpty(validaciones.companyName);
  });


  it('El campo company-catchPhrase requerido', () => {
    const data = {
      "name": "Camilo Bello Peñailillo",
      "username": "camilo.bello",
      "email": "camilo.bello@hotmail.com",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 5562222",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "phone": "124-3211221-3321",
      "website": "www.miweb.cl",
      "company": {
        "name": "Romaguera-Crona",
        // "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }
    };

    const validaciones = validateUser.validateUser(data);
    assert.isObject(validaciones);
    assert.hasAllKeys(validaciones, ["catchPhrase"]);
    assert.isArray(validaciones.catchPhrase);
    assert.isNotEmpty(validaciones.catchPhrase);
  });


  it('El campo company-bs requerido', () => {
    const data = {
      "name": "Camilo Bello Peñailillo",
      "username": "camilo.bello",
      "email": "camilo.bello@hotmail.com",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 5562222",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "phone": "124-3211221-3321",
      "website": "www.miweb.cl",
      "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        // "bs": "harness real-time e-markets"
      }
    };

    const validaciones = validateUser.validateUser(data);
    assert.isObject(validaciones);
    assert.hasAllKeys(validaciones, ["bs"]);
    assert.isArray(validaciones.bs);
    assert.isNotEmpty(validaciones.bs);
  });


  it('User valido', () => {
    const data = {
      "name": "Usuario de prueba jsonplaceholder",
      "username": "Bret.bret.bret",
      "email": "Sincere@april.com",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 5562222",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "phone": "1-770-736-8031",
      "website": "hildegard.org",
      "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }
    };

    const validaciones = validateUser.validateUser(data);
    assert.isUndefined(validaciones);
    userRepositorio.save(data);
  });

});