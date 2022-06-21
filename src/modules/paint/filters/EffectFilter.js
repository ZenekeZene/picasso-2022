const EffectFilter = () => (
  <filter id="effect">
    <feFlood floodColor="#73DCFF" floodOpacity="0.75" result="COLOR-blu"></feFlood>
    <feFlood floodColor="#9673FF" floodOpacity="0.4" result="COLOR-red"></feFlood>

    <feTurbulence baseFrequency=".05" type="fractalNoise" numOctaves="3" seed="0" result="Texture_10"></feTurbulence>
    <feColorMatrix type="matrix" values="0 0 0 0 0,
    0 0 0 0 0,
    0 0 0 0 0,
    0 0 0 -2.1 1.1" in="Texture_10" result="Texture_20"></feColorMatrix>

    <feColorMatrix result="Texture_30" type="matrix" values="0 0 0 0 0,
    0 0 0 0 0,
    0 0 0 0 0,
    0 0 0 -1.7 1.8" in="Texture_10"></feColorMatrix>

    <feOffset dx="-3" dy="4" in="SourceAlpha" result="FILL_10"></feOffset>
    <feDisplacementMap scale="17" in="FILL_10" in2="Texture_10" result="FILL_20"></feDisplacementMap>
    <feComposite operator="in" in="Texture_30" in2="FILL_20" result="FILL_40"></feComposite>
    <feComposite operator="in" in="COLOR-blu" in2="FILL_40" result="FILL_50"></feComposite>

    <feMorphology operator="dilate" radius="3" in="SourceAlpha" result="OUTLINE_10"></feMorphology>
    <feComposite operator="out" in="OUTLINE_10" in2="SourceAlpha" result="OUTLINE_20"></feComposite>
    <feDisplacementMap scale="7" in="OUTLINE_20" in2="Texture_10" result="OUTLINE_30"></feDisplacementMap>
    <feComposite operator="arithmetic" k2="-1" k3="1" in="Texture_20" in2="OUTLINE_30" result="OUTLINE_40"></feComposite>

    <feConvolveMatrix order="8,8" divisor="1" kernelMatrix="1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 " in="SourceAlpha" result="BEVEL_10"></feConvolveMatrix>
    <feMorphology operator="dilate" radius="2" in="BEVEL_10" result="BEVEL_20"></feMorphology>
    <feComposite operator="out" in="BEVEL_20" in2="BEVEL_10" result="BEVEL_30"></feComposite>
    <feDisplacementMap scale="7" in="BEVEL_30" in2="Texture_10" result="BEVEL_40"></feDisplacementMap>
    <feComposite operator="arithmetic" k2="-1" k3="1" in="Texture_20" in2="BEVEL_40" result="BEVEL_50"></feComposite>
    <feOffset dx="-7" dy="-7" in="BEVEL_50" result="BEVEL_60"></feOffset>
    <feComposite operator="out" in="BEVEL_60" in2="OUTLINE_10" result="BEVEL_70"></feComposite>

    <feOffset dx="-9" dy="-9" in="BEVEL_10" result="BEVEL-FILL_10"></feOffset>
    <feComposite operator="out" in="BEVEL-FILL_10" in2="OUTLINE_10" result="BEVEL-FILL_20"></feComposite>
    <feDisplacementMap scale="17" in="BEVEL-FILL_20" in2="Texture_10" result="BEVEL-FILL_30"></feDisplacementMap>


    <feMerge result="merge2">
      <feMergeNode in="BEVEL-FILL_50"></feMergeNode>
      <feMergeNode in="BEVEL_70"></feMergeNode>
      <feMergeNode in="FILL_50"></feMergeNode>
      <feMergeNode in="OUTLINE_40"></feMergeNode>
    </feMerge>
  </filter>
)

export default EffectFilter
