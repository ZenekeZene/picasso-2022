const BlopFilter = () => (
  <filter id="blop">

    <feFlood floodColor="#551C0B" result="COLOR-outline"></feFlood>

    <feMorphology operator="dilate" radius="5" in="SourceAlpha" result="OUTLINE_10"></feMorphology>
    <feComposite operator="in" in="COLOR-outline" in2="OUTLINE_10" result="OUTLINE_20"></feComposite>

    <feGaussianBlur stdDeviation="4" in="SourceAlpha" result="LIGHTING-EFFECTS_10"></feGaussianBlur>
    <feSpecularLighting surfaceScale="5" specularConstant="0.8" specularExponent="7.5" lightingColor="#white" in="LIGHTING-EFFECTS_10" result="LIGHTING-EFFECTS_20">
      <fePointLight x="-250" y="-50" z="300"></fePointLight>
    </feSpecularLighting>
    <feComposite operator="in" in="LIGHTING-EFFECTS_20" in2="SourceAlpha" result="LIGHTING-EFFECTS_30"></feComposite>
    <feComposite in="SourceGraphic" in2="LIGHTING-EFFECTS_30" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="LIGHTING-EFFECTS_40"></feComposite>

    <feComponentTransfer in="LIGHTING-EFFECTS_40" result="COLOR-EFFECTS_10">
      <feFuncR type="gamma" offset="-0.3" amplitude="1.1" exponent="4.84"></feFuncR>
      <feFuncG type="gamma" offset="-0.3" amplitude="3.1" exponent="4.84"></feFuncG>
      <feFuncB type="gamma" offset="13.3" amplitude="0.1" exponent="1.84"></feFuncB>
    </feComponentTransfer>

    <feMerge>
      <feMergeNode in="OUTLINE_20"></feMergeNode>
      <feMergeNode in="COLOR-EFFECTS_10"></feMergeNode>
    </feMerge>
  </filter>
)

export default BlopFilter
