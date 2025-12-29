package com.example.api;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;

@Path("/persons")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PersonResource {

    private static List<Person> persons = new ArrayList<>();
    private static int idCounter = 1;

    @GET
    public List<Person> getAll() {
        return persons;
    }

    @POST
    public Response addPerson(Person p) {
        p.setId(idCounter++);
        persons.add(p);
        return Response.status(Response.Status.CREATED).entity(p).build();
    }

    @PUT
    @Path("{id}")
    public Response updatePerson(@PathParam("id") int id, Person p) {
        for (Person person : persons) {
            if (person.getId() == id) {
                person.setName(p.getName());
                person.setEmail(p.getEmail());
                person.setAge(p.getAge());
                return Response.ok(person).build();
            }
        }
        return Response.status(Response.Status.NOT_FOUND).build();
    }

    @DELETE
    @Path("{id}")
    public Response deletePerson(@PathParam("id") int id) {
        persons.removeIf(p -> p.getId() == id);
        return Response.noContent().build();
    }
}
