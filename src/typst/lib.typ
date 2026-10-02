#let theme = (
  page: white,
  ink: luma(30),
  muted: luma(130),
  line: luma(248),
)

#let select(data, pinned-only: false, types: none, institutions: none) = {
  data.filter(e => {
    if pinned-only and not e.at("pinned", default: false) { return false }
    if types != none and e.at("type", default: none) not in types { return false }
    if institutions != none and e.institution not in institutions { return false }
    true
  })
}

#let parse-date(s) = {
  if s == none { return none }
  let p = s.split("-")
  datetime(
    year: int(p.at(0)),
    month: if p.len() > 1 { int(p.at(1)) } else { 1 },
    day: if p.len() > 2 { int(p.at(2)) } else { 1 },
  )
}

#let year-range(e) = {
  let b = parse-date(e.begin)
  let en = parse-date(e.at("end", default: none))
  if b == none { return "" }
  if en == none { str(b.year()) + " – PRESENT" } else if b.year() == en.year() { str(b.year()) } else {
    str(b.year()) + " – " + str(en.year())
  }
}

#let first-para(s) = s.split(regex("\n\s*- ")).at(0).replace(regex("\s+"), " ").trim()

#let details(s) = {
  let blocks = ()
  let para = ()
  for line in s.split("\n") {
    let t = line.trim()
    if t.starts-with("- ") {
      if para.len() > 0 {
        blocks.push(("p", para.join(" ")))
        para = ()
      }
      blocks.push(("li", t.slice(2).replace(regex("\s+"), " ")))
    } else if t == "" {
      if para.len() > 0 {
        blocks.push(("p", para.join(" ")))
        para = ()
      }
    } else {
      para.push(t.replace(regex("\s+"), " "))
    }
  }
  if para.len() > 0 { blocks.push(("p", para.join(" "))) }
  for (i, block) in blocks.enumerate() {
    if i > 0 {
      v(0em)
    }
    if block.at(0) == "li" {
      grid(
        columns: (0.9em, 1fr),
        column-gutter: 0em,
        row-gutter: 0.1em,
        [•], eval(block.at(1), mode: "markup"),
      )
    } else {
      eval(block.at(1), mode: "markup")
    }
  }
}

#let tech-block(technology) = {
  if technology == none { return }
  let cols = ()

  for (key, items) in technology {
    if items.len() > 0 {
      cols.push({
        text(size: 7pt, fill: luma(160), strong(upper(key)))
        linebreak()
        items.map(x => text(size: 8pt, x)).join([\ ])
      })
    }
  }

  if cols.len() == 0 { return }
  v(0.5em)
  grid(columns: cols.len() * (auto,), column-gutter: 1.4em, ..cols)
}

#let tech-stack(technology) = {
  if technology == none { return }
  let cells = ()

  for (key, items) in technology {
    if items.len() > 0 {
      cells.push(
        text(size: 7pt, fill: luma(160), strong(delta: 400, upper(key))),
      )
      cells.push(
        text(size: 8pt, items.join(", ")),
      )
    }
  }

  if cells.len() == 0 { return }
  v(0.5em)
  grid(
    columns: (auto, 1fr),
    row-gutter: 0.5em,
    column-gutter: 0.8em,
    ..cells,
  )
}

#let label(body) = text(size: 8pt, weight: "bold", tracking: 0.12em, upper(body))

#let colorize-svg(path, color, height) = {
  let svg = read(path)
  let hex = color.to-hex()
  if svg.contains("currentColor") {
    svg = svg.replace("currentColor", hex)
  } else if svg.contains("#000000") or svg.contains("#000") {
    svg = svg.replace("#000000", hex).replace("#000", hex)
  } else {
    svg = svg.replace("<svg ", "<svg fill=\"" + hex + "\" ")
  }
  image(bytes(svg), height: height)
}

#let icon(name, size: 1em, color: luma(0)) = {
  box(
    baseline: 14%,
    colorize-svg("icons/" + name + ".svg", color, size),
  )
}

#let person-link(name) = {
  person.links.filter(l => lower(l.label) == lower(name)).at(0, default: none)
}

#let entry-links(e) = {
  let ls = e.at("links", default: none)
  if ls != none { return ls }
  let l = e.at("link", default: none)
  if l != none { return (l,) }
  ()
}

