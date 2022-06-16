const GlowFilter = () => {
  return (
    <filter id="drop-shadow">
		<feGaussianBlur in="SourceAlpha" stdDeviation="8"/>
		<feOffset dx="9" dy="11" result="offsetblur"/>
		<feFlood floodColor="rgba(0,0,0,0.4)"/>
		<feComposite in2="offsetblur" operator="in"/>
		<feMerge>
			<feMergeNode/>
			<feMergeNode in="SourceGraphic"/>
		</feMerge>
	</filter>
  )
}

export default GlowFilter
