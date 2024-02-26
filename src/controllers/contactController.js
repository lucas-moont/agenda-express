const Contact = require("../modules/ContactModel");

exports.index = (req, res) => {
  res.render("contact", {
    titulo: "Pages de contato",
    contato: {}
  });
};

exports.register = async (req, res) => {
  try {
    let contact = new Contact(req.body, res.locals.user.email);
    await contact.register();

    if (contact.errors.length > 0) {
      req.flash("errors", contact.errors);
      req.session.save(() => {
        return res.redirect("/contato");
      });
      return;
    } else {
      req.flash("sucess", "Contato criado com sucesso");
      req.session.save(() => {
        return res.redirect(`/contato/${contact.contact._id}`);
      });
      return;
    }
  } catch (e) {
    console.log(e);
    return res.render("404", { titulo: "Erro 404" });
  }
};

exports.editIndex = async (req, res, next) => {
  if (!req.params.id) return res.render("404");
  try {
    const contato = await Contact.findId(req.params.id);

    if (!contato) return;

    res.render("contact", {
      titulo: 'Editar contato',
      contato: contato
    });
  } catch (e) {
    res.send(e)
  }
};

exports.editContact = async (req, res, next) => {
  if (!req.params.id) return res.render("404", {
    titulo: 'Não existe ID'
  });

  try{
    const contact = await new Contact(
      req.body,
      res.locals.user.email
    )

    if(!contact) return

    await contact.edit(req.params.id)
    if (contact.errors.length > 0) {
      req.flash("errors", contact.errors);
      req.session.save(() => {
        return res.redirect(`/contato/${req.params.id}`);
      });
      return;
    } else {
      req.flash("sucess", "Contato editado com sucesso");
      req.session.save(() => {
        return res.redirect(`/contato/${req.params.id}`);
      });
      return;
    }

  }catch(e){
    res.render('404', {
      titulo: "Erro na edição"
    })
  }

}
