// typst compile --input "data=$(xh get localhost:3000/data)" cv.typ

#import "@preview/cmarker:0.1.10"
#import "lib.typ": *

#let default-data = ```json
{
  "profile": {
    "name": "",
    "street": "",
    "postalCode": "",
    "city": "",
    "country": "",
    "vatId": "",
    "email": ""
  },
  "timeline": [],
  "work": []
}
```

#let data = json(bytes(sys.inputs.at("data", default: default-data.text)))

#let size = (
  text: 9.5pt,
)

#let theme = (
  page: white,
  ink: luma(30),
  muted: luma(130),
  line: luma(248),
)

#let config = (
  pinned-only: true,
  margin: (x: 2.2cm, y: 1.9cm),
  columns: (4fr, 1fr, 7fr),
  num-columns: 12,
)

#let space = (
  column-gutter: 0cm,
  row-gutter: 1cm,
)

#set page(paper: "a4", margin: config.margin, fill: theme.page, background: place(
  top + left,
)[
  #let ncols = 12
  #for i in range(0, ncols + 1) {
    place(dx: config.margin.x, dy: 0%, line(
      start: (i * ((100% - config.margin.x * 2) / ncols), 0%),
      angle: 90deg,
      length: 100%,
      stroke: theme.line,
    ))
  }
])

#set text(font: "Instrument Sans", weight: "regular", size: size.text, fill: theme.ink, lang: "en")
#set par(leading: 0.65em)
#set strong(delta: 150)
#show heading.where(level: 1): set text(size: size.text, weight: "bold")
#show heading.where(level: 2): set text(size: size.text, weight: "bold")
#show heading.where(level: 3): set text(size: size.text)


#let entries = select(
  data.timeline,
  pinned-only: config.pinned-only,
)

#let intro = [
  Software engineer with a decade of experience shipping products and production infrastructure in *TypeScript*, *Python*, and *Rust*. Recent work includes high-volume API metering and billing, and leading a four-engineer team from concept to a customer-facing MVP. Additional experience in C++ audio software and interactive graphics.
]

#grid(
  columns: config.columns,
  column-gutter: space.column-gutter,
  {
    heading(level: 1, data.profile.name)
    text(size: 8.5pt)[
      #data.profile.city, #data.profile.country \
      #v(0.05em)
      #icon("mail") #h(0.3em) #link(
        "mailto:" + data.profile.email,
        data.profile.email,
      ) \
      #icon("globe") #h(0.3em) #link(
        "https://eulervoid.com",
        "eulervoid.com",
      ) \
      #icon("github") #h(0.3em) #link(
        "https://github.com/eulervoid",
        "github.com/eulervoid",
      )
    ]
  },
  [],
  text(intro),
)

#v(space.row-gutter)
#align(center, heading(level: 2, text(fill: theme.ink, size: 9pt, upper("Professional Experience"))))
#v(1.5em)

#for (i, entry) in entries.enumerate() {
  block(breakable: false, grid(
    columns: config.columns,
    column-gutter: space.column-gutter,
    row-gutter: space.row-gutter,
    {
      grid(
        columns: (0.9em, 1fr),
        column-gutter: 0.55em,
        move(dy: 0.12em, square(size: 0.45em, fill: theme.ink)),
        [
          #heading(level: 3, entry.institution)
          #entry.role
          #linebreak()
          #year-range(entry)
          #let ls = entry-links(entry)
          #if ls.len() > 0 {
            v(0.1em)
            ls
              .map(l => {
                set text(size: 8pt, fill: theme.muted)
                link(l.url, [#icon("arrow-right", color: theme.muted)#h(0.3em)#l.text])
              })
              .join(linebreak())
          }
        ],
      )
    },
    [],
    {
      cmarker.render(entry.details)
      tech-stack(entry.at("technology", default: none))
    },
  ))
  v(space.row-gutter, weak: true)
}

#v(space.row-gutter)
#v(1fr)

#grid(
  columns: config.columns,
  column-gutter: space.column-gutter,
  [
    == LANGUAGES
    German (Native) \
    English (C1) \
    Portuguese (B2)
  ],
  [],
  [
    == EDUCATION
    Diplom-Medieninformatiker \
    (equiv. M.Sc. Media Computer Science) \
    Technical University of Dresden, 2015 — overall grade: 1.3 \
    Thesis: #emph[Zykloid: A Visual Approach to Drum Synthesis] — 1.0
  ],
)
