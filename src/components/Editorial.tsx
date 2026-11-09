import { ArrowUpRight, BookOpen, PenLine, ShieldCheck, X } from 'lucide-react'
import { useState } from 'react'
import type { CarEntry } from '../types'

const writers = [
  { name: 'Maks Orlov', desk: 'Design desk', initials: 'MO' },
  { name: 'Lena Weiss', desk: 'Engineering desk', initials: 'LW' },
  { name: 'Theo March', desk: 'Culture desk', initials: 'TM' },
]

export default function Editorial({ car }: { car: CarEntry }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="editorial section-shell">
      <div className="section-kicker"><BookOpen size={16} /> EDITORIAL FILE</div>
      <div className="editorial__grid">
        {car.editorialAngles.map((title, index) => {
          const expanded = open === index
          return (
            <article className={`article-card ${expanded ? 'is-open' : ''}`} key={title}>
              <div className="article-card__author">
                <div className="avatar avatar--editorial">{writers[index].initials}</div>
                <div><strong>{writers[index].name}</strong><span>{writers[index].desk} · fictional editorial byline</span></div>
              </div>
              <h3>{title}</h3>
              <p>{articleCopy(car, index)}</p>
              {expanded && <div className="article-card__expanded">{longCopy(car, index).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>}
              <button onClick={() => setOpen(expanded ? null : index)}>
                {expanded ? <>Close field note <X size={15} /></> : <>Read field note <ArrowUpRight size={15} /></>}
              </button>
            </article>
          )
        })}
      </div>
      <div className="verified-panel">
        <div className="verified-panel__icon"><ShieldCheck size={19} /></div>
        <div>
          <span>PUBLIC QUOTES / VERIFIED ONLY</span>
          <h3>Комментарии известных людей показываются только вместе с проверяемой ссылкой на источник.</h3>
          <p>В демо мы намеренно не генерируем лица и «цитаты знаменитостей» без подтверждения. Добавьте документированный источник в данные модели — и карточка появится здесь.</p>
        </div>
        <PenLine size={24} />
      </div>
    </section>
  )
}

function articleCopy(car: CarEntry, index: number) {
  if (index === 0) return `${car.model} читается не как набор эффектных деталей, а как единая поверхность: воздух, свет и пропорции задают характер ещё до того, как речь заходит о мощности.`
  if (index === 1) return `Здесь важна не только пиковая отдача. Мы смотрим на архитектуру, распределение массы, торможение, тепловой режим и то, как ${car.brand} превращает цифры в ощущение контроля.`
  return `${car.model} существует внутри определённой автомобильной культуры: ${car.segment.toLowerCase()}, ${car.era}, ${car.country}. Кому она интересна, почему её обсуждают и в каком контексте она становится символом.`
}

function longCopy(car: CarEntry, index: number) {
  if (index === 0) return [
    `В профиль ${car.model} воспринимается прежде всего через отношение кабины к колёсной базе и через то, как кузов визуально «садится» на оси. У быстрых машин эта пропорция часто важнее любой отдельной декоративной детали: именно она создаёт ощущение готовности к движению даже на статичном кадре.`,
    `Хороший дизайн performance-машины работает и без яркого цвета. Поэтому в NOIR MACHINES объект специально рассматривается в почти монохромной среде: так лучше читаются поверхности, выштамповки, воздуховоды и тени.`,
    `Этот текст — авторская редакционная интерпретация прототипа сайта, а не цитата производителя. Для точных утверждений об аэродинамике и конструктивных решениях в production-версии стоит привязать отдельные source URLs к каждому факту.`,
  ]
  if (index === 1) return [
    `Инженерная ценность ${car.model} не сводится к строке «мощность». На реальной дороге и тем более на треке одинаково важны калибровка педали тормоза, температура шин, реакция шасси на перенос веса, логика коробки и устойчивость машины в повторяющихся нагрузках.`,
    `Поэтому демонстрационные цифры в интерфейсе помечены звёздочкой. Они нужны, чтобы показать структуру будущей карточки, но не должны попадать в энциклопедический релиз без проверки по первичному техническому источнику.`,
    `Следующий уровень проекта — хранить рядом с каждым параметром отдельную ссылку на manufacturer sheet, homologation document или другой проверяемый документ и отображать происхождение цифры по клику.`,
  ]
  return [
    `${car.brand} ${car.model} интересна не только владельцам. Вокруг таких машин формируются зрители, фотографы, дизайнеры, инженеры, коллекционеры, симрейсеры и люди, которым важна история марки. Именно поэтому «аудитория машины» здесь описывается шире покупательского сегмента.`,
    `Категория ${car.segment} задаёт ожидания: одни модели ценят за трековую дисциплину, другие — за редкость, технологичность, звук, исторический контекст или визуальный образ. Эти причины могут пересекаться и меняются со временем.`,
    `Для production-версии популярность лучше не оценивать «на глаз»: её можно дополнить проверяемыми данными — тиражом, количеством регистраций по рынкам, поисковым интересом, аукционными данными и аудиториями профильных сообществ.`,
  ]
}
