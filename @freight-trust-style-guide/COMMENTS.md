// Line comment is allowed almost everywhere

/* So are block comments */

otherwise, "document" is expected first

document
  default <http://example.org/default>
  prefix b <http://example.org/bundle#>
  prefix ex <http://example.org/>

  // a line comment
  entity(ex:e1)  // Should we have a type for this entity?
  entity(ex:e2, [prov:type='ex:Type'
    //, prov:location=TBD]) -- a comment in the attribute block
  ])
  activity(a1, 2008-08-30T01:45:36, 2008-08-30T01:45:36.123Z)
  
  bundle b:b1
    // An empty bundle
  endBundle
  
  entity(invalid) // no more statement allowed after the first bundle

  bundle b:b2
    wasDerivedFrom(ex:e2, ex:e1)

    entity(e3, [prov:value=12, prov:label="An integer value"])
    wasGeneratedBy(ex:e3, - , 2008-08-30T01:45:36.123-08:00)

    entity(ex:date, [prov:value="2008-08-30" %% xsd:date,
                     prov:label="A XSD (date) value", ex:invalid=abc])
  endBundle

endDocument

// Commenting after a document finishes is OK

/* Block comment also fine

So are the spaces and blank lines
 */

But other than that, anything else is not allowed after endDocument
even a new document

document
endDocument